# photoshare
A tool for organizing, tagging, and archiving images that are created for use within an organization

##How to get started:
1. Create virtual environment folder outside the repository folder. [Read about python's virtual environment here](https://virtualenv.pypa.io/en/stable/).
2. activate your newly created virtual environment 
3. cd out of the virtual env folder and into your repo's folder
4. run `pip install -r requirements.txt`
5. if you don't have bower, [install it](https://bower.io).
6. run `python manage.py bower install`
7. run `python manage.py makemigrations`
8. run `python manage.py migrate`
9. run `python manage.py runserver`
10. navigate to [local host 8000](http://localhost:8000/register)