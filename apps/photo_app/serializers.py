from rest_framework import serializers

from models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    model = Photo
    fields = ('id', 'title', 'description', 'subject', 'photographer', 'architect', 'notes', 'rights', 'directory_name', 'file_format', 'file_name', 'has_people', 'provenance')
    read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        return model.objects.create(**validated_data)