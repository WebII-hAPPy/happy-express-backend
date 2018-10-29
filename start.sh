echo export JWT_SECRET=\"m2wiOsmY49k7kfbRaPkYHlshvsqfP+/OP/q1IvFEZ0MgpUIR6dREQWgs8+SiKl5fI1dfiYfNJhpwluel4XhHbKd+WmyXU1m3oMQLpRMI8ySD/hmCTbR5SOTzBqYkPI3Q3IAz//9oAwI0uoy4BFpj5tXkS5fQjFrLqL82As5KVovzF87/H89ekmUuW27z1lXj3o5+NtDKPNo3WCnnmkp0p6GbCmWODh7ACUGLIx0FA63aG/6HCVzZWaJ+Cbv1smXzNXeIXUbL6X1UZAwE24pCtZju7O4NAY488OnfcfAGFD4OZ8ulPR86h6j4hTSyA4JHABn5hiVbvaTRa6/8H48JZQ==\" > app-env
echo export GMAIL_USER=\"mailfrom.happy.team@gmail.com\" >> app-env
echo export GMAIL_PASS=\"happyteam\" >> app-env
 
. ./app-env

yarn start-prod