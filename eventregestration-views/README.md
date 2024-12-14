This Event Management project is developed having backend as nodejs and frontend using reactjs.
This repository is divided in two parts eventregistration-view(frontend) and eventregistration-api(backend)

eventregistration-api:
This project folder contains the api route calls and the necessary models created.

models:
contains the schema of database tables.

routes:
admin.js contains all the apis related to admin side panel.
users.js contains all the apis related to user side.

user-images:
contains the images uploaded while registration.

eventregistration-Views:
components:-
this contains the cmponents like:-

RegistrationChart.js - the admin side chart component for viewing details.
Review.js - this is a component for the review application after the registration.
UserDetails.js - component has a form to get user details.

layouts:-
AdmoinLayout.js is the layout for admin side.
UserLayout is the layout for veuser side.
Login.js - contains the login layout.
Table.js - contains the table layout.

utils:-
redux:
Contains the code to use the react-redux stores,type,action,reducers.
ProtectedHeader is used to maintain session of admin by setting cookie.

views:-
admin:
Contains the views of admin:
AdminApplication is the layout to view admin side application.
user:
UserApplication is the view for the user side application.
