from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse, HttpRequest

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.views.generic.base import TemplateView, View
from django.views import View

from models import Photo, Collection, Tag
from serializers import PhotoSerializer

from rest_framework import viewsets

import base64, hmac, hashlib, json, sys

try:
    import boto3
    s3 = boto3.resource('s3')
    BUCKET = s3.Bucket('localbrainstormphotoshare')
except ImportError, e:
    print("Could not import boto")
    print("Deleting files will not work.")
    print("Install boto with ")
    print("$ pip install boto3")

upload_group = []

# Create your views here.
class IndexView(TemplateView):
    print("in IndexView")
    template_name = 'photos.html'
    #reset the upload group anytime the page is reloaded so it doesn't continue to store the uuids

class HandleS3View(View):

    def post(self, request):
        if request.POST.get('uuid', None):
            # save a reference to the group of photos that have been uploaded
            upload_group.append(request.POST.get('uuid'))
            json_upload_group = json.dumps({"images": upload_group})
            #send the upload group as a comma separated string to the frontend
            return make_response(200, json_upload_group)
        else:
            request_payload = json.loads(request.body)
            headers = request_payload.get('headers', None)
            if headers:
                # The presence of the 'headers' property in the request payload
                # means this is a request to sign a REST/multipart request
                # and NOT a policy document
                response_data = sign_headers(headers)
            else:
                if not is_valid_policy(request_payload):
                    return make_response(400, {'invalid': True})
                response_data = sign_policy_document(request_payload)
            response_payload = json.dumps(response_data)
            return make_response(200, response_payload)


    def delete(self, request):
        if boto3:
            key = request.path[11:]
            response = BUCKET.delete_objects(
                Delete={
                    'Objects': [
                    {
                        'Key': key + '.jpg'
                    }]
                }
            )
            #remove the uuid from the photo groups array
            upload_group.remove(request.path[11:])
            json_upload_group = json.dumps({"images": upload_group})
            return make_response(200, json_upload_group)
        else:
            return make_response(500)

    def success_redirect_endpoint(self, request):
        """ This is where the upload will snd a POST request after the
        file has been stored in S3.
        """
        return make_response(200)


class PhotoView(View):
    serializer_class = PhotoSerializer

    def post(self, request, *args, **kwargs):
        print("hellooo")
        print(request.POST)


def make_response(status=200, content=None):
    response = HttpResponse()
    response.status_code = status
    response['Content-Type'] = "application/json"
    #the response content can be found in s3.fine-uploader.js line 6829 as xhrOrXdr.responseText
    #it reads as text rather than a JSON object
    response.content = content
    return response


def is_valid_policy(policy_document):
    bucket = ''
    parsed_max_size = 0

    for condition in policy_document['conditions']:
        if isinstance(condition, list) and condition[0] == 'content-length-range':
            parsed_max_size = condition[2]
        else:
            if condition.get('bucket', None):
                bucket = condition['bucket']

    return bucket == settings.AWS_EXPECTED_BUCKET


def sign_policy_document(policy_document):
    policy = base64.b64encode(json.dumps(policy_document))
    signature = base64.b64encode(hmac.new(settings.AWS_SERVER_SECRET_KEY, policy, hashlib.sha1).digest())
    return {
        'policy': policy,
        'signature': signature
    }


def sign_headers(headers):
    return {
        'signature': base64.b64encode(hmac.new(settings.AWS_SERVER_SECRET_KEY, headers, hashlib.sha1).digest())
    }

class CollectionView(View):
    def get(self, request):
        print("in here")
        collections = Collection.objects.get_all_collections()
        return make_response(200, json.dumps(collections))

    def post(self, request):
        # First, we create collection if it doesn't exist
        # Second, add the tags to the collection
        # Update the collection
        # Last, we update the photos with tags, title, description and user - we will be looping through the tags twice to avoid getting too messy/to try and keep the functionality of everything as modular as possible
        upload_group = []
        if request.method == 'POST':
            body = json.loads(request.body)
            # if the collection already exists
            need_to_create_collection = self.need_collection(body)
            # the collection gets created in the first step of uploading - before the form with title and description. The photos get created with the collection
            if need_to_create_collection:
                data = Collection.objects.new_collection(body)
                return make_response(200, json.dumps(data))
            else:
                collection = Collection.objects.get_collection_query_set(body['collection_id'])
                if self.tags_are_present(body):
                    tags_list = Tag.objects.create_or_update(body['tags'], body['collection_id'])
                Collection.objects.update_collection(collection, body['name'], body['description'])
                #finally update the photos
                photos = Photo.objects.update_all(collection, body['name'], body['description'], tags_list)  
                return make_response(200, json.dumps(photos))

    def tags_are_present(self, body):
        if body.has_key("tags") and len(body['tags']) > 0:
            return True
        else:
            return False

    def need_collection(self, body):
        if body.has_key("collection_id"):
            return False
        else:
            return True


class TagView(View):
    def get(self, request):
        all_tags = []
        tags = list(Tag.objects.all())
        print tags
        for tag in tags:
            all_tags.append({"name": tag.name, "id": tag.id})
        return make_response(200, json.dumps(all_tags))

