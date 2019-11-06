

# ArtsyBiz
New Version URL (updated 10/19): https://dark-crypt-62855.herokuapp.com/

OLD URL: https://sheltered-forest-14553.herokuapp.com/

Name: “ArtsyBiz"

Genre: Services/Arts

By: Katie So

# Updated Oct 31, 2019
* Removed unused logic
* CSS variable
* HTML5 semantics
* Responsive with media query
* UI refresh with more white space
* Separated planner and artist login
* 2 landing page for planner and artist

#Next Step
* Angular frontend
* Form validation (sign up, rate artist, hire artist)
* 404 page
* Vendor login
* Vendor edit profile
* Move routes and controller logic out of server.js
* Chat between planner and artist (maybe)


## Audience & Userstories:
1. Project Planners/Wedding Planners on a budget seeking amateur talents or just looking for local vendors.
2. Vendors (known as Artsy) looking for work or just trying to expand their portfolio
Description:  The ArtsyBiz app will allow users to search and contract artsy vendors for their project or wedding~ Users can also sign up to became an Artsy and connect with potential clients!

## Data Model ERD
User: email, password, name

Vendor: email, password, name, serviceType, picture, location, cost, url

Orders: user_id, vendor_id, rating

ERD: Users can have many Orders && Vendors can have many Orders

## MVP
User login

Vendor Login

Authorization

Rating

Validation

## Wireframes 

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/1.jpg" width="300" height="375"/>

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/2.jpg" width="300" height="375"/>

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/3.jpg" width="300" height="375"/>

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/4.jpg" width="300" height="375"/>

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/5.jpg" width="300" height="375"/>

<img src="https://github.com/ktso11/ArtsyBiz/blob/master/wireframe/6.jpg" width="300" height="375"/>
