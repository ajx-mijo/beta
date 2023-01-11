# Beta Readme

## Description

Beta was my final solo project of my Software Engineering Immersive Course with the objective of  building a Full-Stack application utilising Python/Django Framework/PostgreSQL on the backend and a React Framework on the Front-End. The project was deployed on Heroku with the key focus being a bug-free, feature-packed application which would allow users to showcase their own projects in a community-focussed environment.

## Deployment Link - [Beta](https://beta.herokuapp.com/)

![Project Screenshot](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image6_u7d2wf.png)

## Timeframe & Working Team

The timeframe for this project was 9 days from planning to delivery and I worked solo to conceive, develop and deliver the final product before presentation to my instructional team.






Technologies Used:



**Front End**
- React Framework
- React-Bootstrap
- React Icons
- React-Select
- JavaScript
- SCSS

**Back-End**
- Python
- Django
- Django REST Framework
- PostgreSQL

**Other Technologies**
- npm packages
- Axios
- Git
- GitHub
- Chrome DevTools
- Cloudinary API
- QuickDBD
- Excalidraw
- Trello



## Brief

The brief set out by the instructional team was to build out a solo Full-Stack application with full CRUD functionality to be deployed on Heroku. The focus was on creating a complete product from the Front-End through to the Back-End with excellent User Experience and a well-thought out User Story. A further emphasis was placed on a visually impressive design and considered integrations of third-party APIs when and if necessary to improve functionality and UX across the app.




















## Planning

To begin planning my application I took inspiration from Stack-Overflow and the Software community focus of some of its products and services. This led me to decide on a project with the working name of App-Overflow, which I later changed to Beta. Once I had decided on the concept I began to create the schema for my SQL data models and the necessary relationships between apps. I created the below diagram using QuickDBD.

![Database Wireframe - QuickDBD](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453520/readMe4/image3_gmvdlf.png)

Following this I created a basic Wireframe for the Front-End of my project. Using ExcaliDraw I sketched out the layout of the individual pages of my project. Due to the time constraints I did not create mobile-first design as I chose to focus on building out functionality and web design. 

![Project Wireframe 1 - Web](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image10_eiyl8e.png)

![Project Wireframe 2 - Web](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image8_bnwbgq.png)


However, I did create a Wireframe for mobile devices and reverse-implemented the UI once I had developed my MVP  features. As far as the workflow was concerned it was relatively straightforward with this project as I was working solo. Firstly,  I planned to fully build out my Back-end, before switching to the Front-End and building out my application page-by-page before implementing my styling and design choices vision with a minimal, stripped back colour scheme and intuitive User Experience and User Story. Priority tasks and tracking my build process was achieved using the Trello platform to break down my workflow into modular tasks.

![Project Wireframe 3 - Mobile](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image7_mfrcgf.png)

## Build/Code Process

As outlined in my plan in the previous section, I started my build process by building out my Back-End applications starting with a central project app, my apps app, my secondary apps (reviews/sectors/tools) before finally implementing my authentication app (jwt_auth). Across all of these I created all the necessary models, serializers and views relevant to the requirements on the Front-End requests. The most complex model I created was for the apps folder where I had to create several Many to Many relationships and Foreign Key relationships with other models.

![Code Screenshot - Django App Model](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image1_iojuw8.png)

For my jwt_auth app I also had to create my authentication route  using the get_user_model Django method.

![Code Screenshot - Get User Model method](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453520/readMe4/image5_pdrqdk.png)

Using this method I was then able to return a token to the authenticated user on the Front-End to allow CRUD functionality on their profiles and personal Projects.

![Code Screenshot - Back-End Authentication JWT](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453522/readMe4/image13_xwvkzi.png)


Having seeded and migrated my Back-End I was then able to start work on my Front-End. I started by building out the skeleton of my Front-End pages and connecting them through the React Router. Next, I created the NavBar for my site and utilized conditional logic to display different options on the navigation bar including the identity of the logged in user.


![Project Screenshot - NavBar](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453520/readMe4/image2_mzltok.png)

![Code Screenshot - Conditional Logic](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453522/readMe4/image12_wu6u74.png)



I then created the Front-End authentication route to store tokens locally and allow for a lot of functionality around User Profiles and the creation and deletion of User generated content across the application.

The next area of focus and one which took up a considerable amount of the time I had available was building out the User Profile page which would display the User Profile information and allow for users to create and update their profiles including information such as their current role, years in industry, a short Bio and a profile picture. In addition to this the users projects and reviews conditionally displayed on their profile page.

![Project Screenshot - Profile Page](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image4_rxhny4.png)

![Code Screenshot - User Application Display JSX](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453522/readMe4/image11_niazel.png)


Following on from this I created the CRUD functionality for individual projects where I had to create dynamic, multi-select dropdowns to allow users to add multiple tools and technologies to their projects. To achieve this I used React-Select to allow for the setting of multiple values in the relevant form field to be sent in Axios POST/PUT requests to the Back-End.

![Code Screenshot - React-Select-Dropdown](https://res.cloudinary.com/doqbnr4p6/image/upload/v1673453521/readMe4/image9_oipuyc.png)

Once I had completed the project Create/Update forms I moved on to creating the index display page and the individual project display pages where I used tabs to display the different descriptions, tools and reviews relevant to the project in question. The ability of a user to leave a review on any project was limited by whether or not they were authenticated and if they were not the user was encouraged to register or login through conditional buttons.

At this point in my build with all the main functionality built out I focussed on a period of testing all my application pages and functionality to identify errors, improve my error-handling and address any bugs which I came across. Conducting tests at this point (as well as after final styling) allowed me to frontrun issues before they stacked up as I approached my deadline.

Finally, I switched my focus to implementing responsiveness over all screen-sizes and settling on a simple blue/white/grey colour scheme. I also designed a logo on FLD (FreeLogoDesign) which took inspiration from the concepts of network, technology and connection - three core ideas behind the purpose of my application. On the landing page I created a typewriter effect and delayed text display using pure CSS to make the application feel more visually alive and engaging for the user.
Challenges

The most significant (and perhaps obvious) challenge on this project was the scale of the requirements and the limited time to complete them - coupled with the fact that it was the first time I had built a Django Back-End and used Python on a project it was overall a steep learning curve.
Creating a dynamic dropdown option for the addition of a User’s project on the Front-End using React-Select and querying different models on the Back-End was a challenge for me as I had never used the React-Select packages before. Now that I have overcome this challenge I would certainly use React-Select in the future as it has an intuitive and well-designed UI.


## Wins
- Developing a Full-Stack application by bringing together and applying all the techniques and technologies that I had learnt over the previous 3 months and doing so independently was a very rewarding experience - I still feel as though I didn’t hit all my stretch goals but having a better feel for the challenges of a large project was a great learning experience.
- Identifying and delivering on a project which I see as having real benefits for potential Users and building a responsive and dynamic UI to make the UX more enjoyable.
- Extensive error handling to improve User Experience
- Dynamic options for the User to include multiple tools/technologies when adding or updating their new projects.


## Key Learnings/Takeaways

- Breaking down challenges into bite-sized pieces before tackling is a far more dynamic method of building out an application.
- Complex data structures can quickly complicate and slow-down the rate of production.
- Working together in a team requires careful planning and excellent communication as well as greater flexibility than solo or indeed pair work. It was a thoroughly enjoyable experience and helping others work through challenges brings greater clarity to processes and improves problem solving capability.

## Bugs

- Currently if a review is left on a Project the owner of the review is assigned to the Project owner not the author of the review - this is a consequence of the relationship between the user - their profile does not necessarily bear the same Unique ID.
- The dynamic drop-down search for the Project Index page does not work (at the moment it is not accessible by the user on the Front-End)


## Future Improvements

- Implement a dynamic, multi-tiered dropdown on the Project Index page
- Improve the Review Display on the User Profile Page and the Individual project page
- Implement Chart.js visuals for the User to view the feedback on their Projects
- Further styling changes to add depth to the site and improve UX. (Potential font changes)
- Add modals for User profile/project deletion
- Further options added for development tools/technologies for individual projects