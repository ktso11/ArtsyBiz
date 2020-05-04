### Congratulations on completing your final project for wdi43!!

This is a really cool app idea, I wish this was around for my wedding planning nightmare lol. Your design is minimalist and attractive, I like it! You have good MVP functionality, and I've noted some places to improve below. I would love to see you develop this further!

Here are some notes on your code and suggestions for you to look into.

### Front end:
- Nice styling, if you want to take it to the next level I bet a UXDI student would love to offer some feedback.
- Clean up all filler text and put in real copy relating to your app.
- Add form validation for mandatory inputs on signup/login.
- You may want to look into `ejs-express-layout` to DRY up your use of header/footer partials etc. Or, for an added challenge, I'd recommend re-implementing your front end in React!
- In App.js, try extracting out your ajax success + error functions (e.g. on submitting your vendor search)
- In App.js, you have some extracted success functions that aren't doing anything except console.logging the data. Go ahead and finish them!
- The user profile page could show who they hired & rated, when they joined, the event details they are planning (and vendors they need to hire). Future goals might be adding their own event details and lists of vendors they need.
- The vendor should also have their own profile view! Who hired them, event date, etc.
- Your ajax call for GET '/api/userorder' is running on every page, could you tie it to the profile view? Currently it's throwing an error when you're logged out on '/'.
- What do you want to happen after rating the artsy? There should be some front end feedback.

### Back end:
- Clear out any commented out code in server.js, and tidy up indentation
- Add backend error handling on bad form submissions (think about what should happen if a user submits a bad signup or login)
- What is happening with the GET requests for '/partials/usersignup', '/partials/userlogin'?
- Consider renaming some routes to be more user-friendly ('userlog', 'vendorlog' sound strange), & add logic for redirection if a logged in user tries to go to the login/signup page again.
- Implement vendor search by location, you are almost there! If there are no vendors of <artist-type> at <location> then return a user-friendly error message on the frontend.
- Finish off your CRUD functionality by allowing users to delete some resources such as their own profile.
  - Would you want someone to delete their profile if they have an upcoming artsy order?
- Consider allowing users to cancel their artsy order.
  - Would you want to fully delete the order or update it and keep it in the db as a "cancelled order"?
  - Maybe in the future, vendors can set a cancellation policy.


  Whew! These are a lot of notes, but I know you have the capability to polish up this project. I strongly encourage you to continue developing this very cool app, both for practicing your skills and for providing a more robust service. You got a lot done in a week, think what you can do in one or two more weeks!

  Let me know if you have any questions or thoughts about this feedback, and have a lovely day :)
  -Stephanie