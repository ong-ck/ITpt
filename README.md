<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ong-ck/ITpt">
    <img src="images/readme/logo.png" alt="Logo">
  </a>

<h3 align="center">ITpt</h3>

  <p align="center">
    ITpt is a fitness tracking website that helps users plan and track their workouts to reach their fitness goals. 
    <br />
    <a href="https://github.com/ong-ck/ITpt"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://itpt-d53e0.web.app/">View Demo</a>
    ·
    <a href="https://github.com/ong-ck/ITpt/issues">Report Bug</a>
    ·
    <a href="https://github.com/ong-ck/ITpt/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#level-of-achievement">Level of Achievement</a></li>
        <li><a href="#description">Description</a></li>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#user-stories">User Stories</a></li>
      </ul>
    </li>
    <li>
      <a href="#system-design">System Design</a>
      <ul>
        <li><a href="#core-features">Core Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#design">Design</a></li>
        <li><a href="#architecture-diagram">Architecture Diagram</a></li>
        <li><a href="#database-structure">Database Structure</a></li>
        <li><a href="#software-engineering-practices">Software Engineering Practices</a></li>
        <li><a href="#mockup">Mockup</a></li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
    <ul>
    <li><a href="#technical-proof-of-concept">Technical Proof of Concept</a></li>
    </ul>
    </li>
    <li>
    <a href="#evaluation">Evaluation</a>
    <ul>
	    <li><a href="#testing-plan">Testing Plan</a></li>
        <li><a href="#interpretation-of-results">Interpretation of results</a></li>
    </ul>
    </li>
    <li>
	    <a href="#roadmap">Roadmap</a>
	    <ul>
	    <li><a href="#scope-of-project">Scope of Project</a></li>
        <li><a href="#development-plan">Development Plan</a></li>
        </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

### Level of Achievement

<center>Apollo 11</center>

### Description

<p align="justify">ITpt is a fitness tracking website that targets fitness enthusiasts. To prepare NSman and NSFs for their yearly IPPT, ITpt offers users a personalised training experience where they are able to customise their training plan to fit their fitness level and training tempo. It also features an in-built IPPT score calculator for them to calculate their scores to track their progress.</p>

### Motivation

<p align="justify">Many of the males in Singapore are required to take the IPPT annually. Failing to pass your IPPT within the given window will condemn you to 10 mandatory seasons of NS Fitness Improvement Training in addition to missing out on monetary awards. While there are many fitness apps and training programmes online, they are often not tailored for the IPPT. In addition, these apps do not come with an IPPT calculator. Therefore users have to find another website to calculate their IPPT score. For ITpt, we have decided to combine the 2 above to create a fitness training website to prepare users for their IPPT. It would recommend exercises to help users improve their score in each station and have an in-build IPPT calculator for greater convenience. Allowing users to seamlessly transition between planning and tracking their workout.</p>

### User Stories

* <p align="justify">As an Nsmen with IPPT coming soon, I want to be able to clear my annual IPPT requirement and get the monetary rewards and not have to go for the NS FIT program.</p>

* <p align="justify">As a student with many commitments, I want a personally curated fitness plan where I can adjust the intensity of my training schedule to be able to keep up with my commitments and still be able to meet my IPPT goals.</p>

* <p align="justify">As a fitness enthusiast, I want to be able to challenge myself to get a better score for ym IPPT. I want to have a training programme that is specially tailored for IPPT.</p>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- SYSTEN DESIGN -->
## System Design

### Core Features

* <p align="justify"><u>Login Feature</u>. A login feature was included to provide users with a personalised planning experience. Users would sign in using their Gmail account by clicking the “Sign in” button. This login feature was implemented using Firebase authentication.</p>

* <p align="justify"><u>Fully Customizable Training Plan</u>. Users are able to use the calendar in the homepage to plan their workouts. Users can insert a new event by clicking on the desired date and key in the details of the activity. To reschedule the activities, users can simply drag the “event block” to another date. This is implemented using FullCalendar which handles the user interface as well as the creation of event objects.</p>

* <p align="justify"><u>In-built IPPT Calculator</u>. Users are able to calculate their IPPT scores using the calculator whenever they need. It displays the points breakdown for each exercise, together with the total score and the corresponding achievement. Furthermore, the IPPT calculator provides feedback to the users on the number of additional reps needed/ amount of time to cut for them to improve their score for each station by one point.</p>

* <p align="justify"><u>Gamification</u>. Points will be given after the users complete each of the activities that set for themselves, with which they can purchase avatars to customise their profile page. As such, users can be incentivised to work towards their fitness goals as they seek to gather customizable items purchasable by their collected points.</p>

* <p align="justify"><u>User Profile</u>. Stores information related to the user such as the avatars owned, credits, IPPT goal and IPPT scores. It also allows users to set their IPPT goal, and tracks their progress toward achieving their desired IPPT scores and their personal best for each station.</p>

* <p align="justify"><u>Mobile Supported</u>. Users are able to continue using ITpt while on their mobile browsers. This gives users the convenience and flexibility in the usage of the website as they can utilise ITpt while on the phone or on their computer.</p>

### Tech Stack

* <a href="https://html.spec.whatwg.org/">HTML</a>/<a href="https://www.w3.org/TR/CSS/#css">CSS</a>/<a href="http://www.ecma-international.org/publications-and-standards/standards/ecma-262/">JS</a>
	* HTML will be used to produce the frontend UI of the website
	* [Bootstrap](https://getbootstrap.com)
		* Provides the design components used in the website
	* Javascript Libraries
		* [JQuery](https://jquery.com)
			* Program the interactions between the frontend UI with the user, producing the UX of the website
		* <a href="https://fullcalendar.io/">FullCalendar</a>/<a href="https://momentjs.com/">Moment.js</a>
			* <p align="justify">FullCalendar library is used to implement the basic features of our fitness planning function. It provides us with the basic UI for the calendar and allows users to easily create and manipulate event objects when inserting their workout plan into the calendar.</p>
			* Moment.js library is used to manipulate the formats of the dates in the event objects generated in the FullCalendar library.
* [Firebase](https://firebase.google.com/)
	* <p align="justify">Firebase Authentication will be used to implement the login feature of the website, letting users login to the website using their google accounts.</p>
	* <p align="justify">Firebase Cloud Firestore will be used as the database of the website, storing the user data (such as the calendar events). This allows for a customised experience for the users.</p>

### Design

#### Activity Diagram

<img src="images/readme/activity_diagram.png" alt="Activity Diagram">

#### Design Decisions
* <p align="justify"><u>Fitness Calendar</u>. We wanted our Fitness Calendar to be simple to use. Therefore we decided to use descriptive buttons and design the calendar in a way that it gives the user the correct perceived affordance. For example, clicking on the date creates an event on the date. To reschedule an event the user can simply drag and drop the event onto another date.</p>

<table>
<thead>
  <tr>
    <th>Criteria</th>
    <th>Approach 1 (FullCalendar)</th>
    <th>Approach 2 (MindFusion)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Complexity</td>
    <td align="justify">Relatively complex as we need to use the moment.js library to manipulate the event date and time.</td>
    <td align="justify">Not as complex. It comes with an inbuilt function to create and edit time without using the moment.js library.</td>
  </tr>
  <tr>
    <td>Extensibility</td>
    <td align="justify">Wide range of functions that can be used to manipulate the event object and Calendar interface. Allow for custom fields for events and buttons on the calendar. This makes it easy for us to add new functions and gives us more control of calendar.</td>
    <td align="justify">Not as much functionalities in the free version as FullCalendar. We were also not able to easily manipulate the calendar interface and event objects.</td>
  </tr>
</tbody>
</table>

* <p align="justify"><u>IPPT Calculator</u>. From past experiences with using IPPT calculators online, there is this ambiguity when keying in the IPPT scores. For example, for the 2.4km run most IPPT calculators only allows users to select their time in 10s intervals. Therefore, users might not know if they should take the upper limit or lower limit when inputing their run time. Therefore for ITpt, we decided to allow the user to key in their exact timing to remove this ambiguity. Unfortunately there was not formula to calculate the the IPPT scores of each station. Therefore we could only reference the IPPT scoring tables found on the NS portal, leaving us with 2 approaches.</p>

<table>
<thead>
  <tr>
    <th>Criteria</th>
    <th>Approach 1 (Using a 2D array as the score sheet)</th>
    <th>Approach 2 (Using if-else statements)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Complexity</td>
    <td align="justify">Not complex to replicate the scoring table found on the NS portal.</td>
    <td align="justify">Slightly more complex to group the different scores together into the same groups and to ensure that all cases are covered.</td>
  </tr>
  <tr>
    <td>Extensibility</td>
    <td align="justify">Easy to add functionalities (e.g. number of addtional reps to get the next point) by iterating through the array.</td>
    <td align="justify">Slightly harder as we would need to loop through the entire if-else statement to get the reps needed to get the next highest point.</td>
  </tr>
  <tr>
    <td>Performance (Time)</td>
    <td align="justify">Fast, with the age and reps as inputs we are able to generate the scores in O(1) time.</td>
    <td align="justify">Slower as we would need to iterate through each case to reach get to the correct score.</td>
  </tr>
  <tr>
    <td>Performance (Space)</td>
    <td align="justify">Takes up more spaces to store the 2D array. O(n*m) where n is the number of reps from 0 to 60 and m is the number of age groups.</td>
    <td align="justify">Takes up less space as we do not need to use additional memory to store the information.</td>
  </tr>
</tbody>
</table>

* <p align="justify"><u>User Profile</u>. Most online IPPT calculator do not allow users to save their results. Therefore we decided to create a user profile to help keep track of our user's IPPT score. This function also compliments our Fitness Calendar. By keeping track of their personal best attempt for each station, users can then identify their weaker station and place more emphasis on them when planning their workout using our fitness calendar. The status bar also gives the user a visual representation of how far they are form achieving their goal and serves as another form of motivation. </p>

* <p align="justify"><u>ITpt Rewards</u>. We wanted to encourage our users to complete their activities diligently. Therefore we made the avatar generation random so that the user would be tempted to keep trying to get their desired avatar. In doing so, they would also be completing more exercies in their fitness plan.</p>

<table>
<thead>
  <tr>
    <th>Criteria</th>
    <th>Approach 1 (Store pre-made avatar images on database and pull from it as needed)</th>
    <th>Approach 2 (Generate avatar images using avatar parts on the spot in the website as the user gets avatar and push to database)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Complexity</td>
    <td align="justify">Approach is not complex as the generation of images is done outside of the website using image drawing tools.</td>
    <td align="justify">Approach is more complex as code needs to be written to combine pre-made avatar parts (face, eyes, mouth, etc).</td>
  </tr>
  <tr>
    <td>Extensibility</td>
    <td align="justify">Easily extensible as the avatar images are all stored in the database. New images only need to be added into the database to allow the users to obtain them in the game.</td>
    <td align="justify">Generally extensible as new parts for the avatar images can be added into the website for the user to be able to generate other avatar images.</td>
  </tr>
  <tr>
    <td>Performance (Time)</td>
    <td align="justify">Fast, as the images url can be pulled from the database and appended into the user's profile.</td>
    <td align="justify">Slow, as time is needed for the website to generate the avatar and push to the database, before pulling from it again to display in the user's profile.</td>
  </tr>
  <tr>
    <td>Performance (Space)</td>
    <td align="justify">Only need to store the avatar image's name and url on the database.</td>
    <td align="justify">Need to store the varying avatar parts as well as the generated avatar. Since each user can generate different avatars, more space will be needed to store each user's avatars.</td>
  </tr>
</tbody>
</table>



### Architecture Diagram

<img src="images/readme/architecture_diagram.png" alt="Architecture Diagram">

### Database Structure

<img src="images/readme/database_structure.png" alt="Database Structure">

### Software Engineering Practices

* Version Control
	* <p align="justify">Changes to the source code are tracked and managed through the use of Github. Storing the source code in a remote repository allows us to work separately on different features, while maintaining the original version of the source code.</p>
	* <p align="justify">New features implemented are pushed into a different branch to be deconflicted before merging into the main branch for the website to update.</p>
* Code Organisation
	* <p align="justify">Codes are organised by components to reduce complexity and allowing for easier debugging. This also enhances readability of the code.</p>
* Coding Standards
	* <p align="justify">HTML, JavaScript and CSS codes were written with reference to <a href="https://www.w3schools.com">w3schools</a>. Following proper standards when writing code allows us to ensure code readability and efficiency.</p>
* Code Documentation
	* <p align="justify">Source code written for the website are documented following the JSDoc 3 Standards to ensure that we will be able to understand the code, thus allowing us to be able to maintain and develop the code efficiently.</p>
* Git Issues
	* <p align="justify">Problems and updates related to the project were added as an issue in Git Issues. The issues added were labelled based on the type. Assignees were also assigned to each issue to distribute the work needed for greater efficiency.</p>
	* <p align="justify">Milestones were also set to contain the issues and provide a deadline for the issues to be resolved in time.</p>
* Continuous Integration / Continuous Development (CI/CD) Pipeline
	* <p align="justify">Web application is automatically tested and deployed using Github Actions whenever a new commit/merge occurs. This ensures that the web application is running properly whenever a new update is implemented.</p>

### Mockup

<img src="images/readme/homepage_mockup.png" alt="Homepage Mockup"><br />
<img src="images/readme/calculator_mockup.png" alt="IPPT Calculator Mockup"><br />
<img src="images/readme/results_mockup.png" alt="IPPT Calculator Results Page Mockup"><br />
<img src="images/readme/profilepage_mockup.jpeg" alt="Profile Page Mockup">

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

### Technical Proof of Concept

The following are screenshots of the website.

#### Homepage
<img src="images/readme/homepage.png" alt="Homepage"><br />
<img src="images/readme/calendar_instructions.png" alt="Calendar Instructions"><br />
<img src="images/readme/calendar_add_event.png" alt="Calendar Add Event"><br />
<img src="images/readme/calendar_event_details_popup.png" alt="Calendar Event Details Popup"><br />

#### Calculator
<img src="images/readme/calculator.png" alt="IPPT Calculator"><br />
<img src="images/readme/results.png" alt="IPPT Calculator Results Page"><br />

#### Rewards
<img src="images/readme/rewards.png" alt="ITpt Rewards Page"><br />
<img src="images/readme/get_avatar.png" alt="ITpt Rewards Get Avatar"><br />

#### Profile
<img src="images/readme/profilepage.png" alt="Profile Page"><br />
<img src="images/readme/profilepage_with_avatar.png" alt="Profile Page With Avatar"><br />
<img src="images/readme/update_ippt_goal.png" alt="Profile Page Update IPPT Goal"><br />
<img src="images/readme/exercise_recommendation.png" alt="Profile Page Exercise Recommendation"><br />

To access the website, simply go to https://www.itpt.ml (or https://itpt-d53e0.web.app/).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- EVALUATION-->
## Evaluation

### Testing Plan

#### Introduction

In order to ensure that ITpt is working as intended based on the features proposed, this testing plan is created to ensure that rigorous and structured testing is implemented.

The testing plan specifies the objectives and tasks, scope, testing strategy, test schedule, control procedure, features tested/not tested and tools used to test the website.

#### Objectives and Tasks

The objective of the testing plan is to ensure that the user interface (UI) and user experience (UX) provided by ITpt meets the proposed description and features.

Expected tasks:
* Ensuring that the UI is showing up properly
* Ensuring that navigation within ITpt provides the expected UX
* Ensuring that ITpt is compatible with various browsers
* Ensuring that ITpt is able to perform within expectations with increased user numbers
* Ensuring that all updates to ITpt are tested
* Seeking user opinions for improvements

#### Scope

The testing plan covers the frontend UI and UX and the backend capabilities of ITpt that are in direct interaction with the users.

#### Testing Strategy

* Unit & GUI Testing
	* <p align="justify"><a href="https://www.cypress.io/">Cypress</a> was used to execute Unit & GUI Testing.</p>
	* <p align="justify">Testing code is written to check that all elements expected are visible on the webpage and the buttons navigate to the expected locations in the website.</p>
<br /><img src="./images/readme/unit_testing.gif" alt="Unit & GUI Testing Results GIF">

* Compatability Testing
	* <p align="justify">The website was checked to be working with different browsers. After every update, the website will also be tested to ensure it is still working.</p>
	* <p align="justify"><a href="https://www.powermapper.com/products/sortsite/checks/browser-compatibility/">PowerMapper</a> was used to determine the compatibility of our website to numerous browsers.</p>
<br /><img src="./images/readme/compatibility_testing.png" alt="Compatibility Testing Results">

* Volume & Stress Testing
	* <p align="justify">The website was checked on whether it can handle large amount of data and multiple users concurrently.</p>
	* <p align="justify"><a href="https://www.webpagetest.org/">Webpagetest</a> was also used to run a performance test on the website.</p>
<br /><img src="./images/readme/performance_testing.png" alt="Performance Testing Results">

* Regression Testing
	* <p align="justify">Use of Github Actions to create a Continuous Integration / Continuous Development (CI/CD) Pipeline that continuously test and deploy ITpt whenever a new feature is added</p>
<br /><img src="./images/readme/ci_cd_pipeline.png" alt="CI/CD Pipeline by Github Actions">

* Usability Testing
	* <p align="justify">Use of Google Forms to gather feedback from users. The results from the google form can be found <a href="https://docs.google.com/spreadsheets/d/1e2TFJL_ZvzwGjvU5aadc3qu0C8DuJmQj2ZBGgqXZj78/edit?usp=sharing">here</a>.</p>

#### Test Schedule

<table>
<thead>
  <tr>
    <th>Test Strategy</th>
    <th>Test Frequency</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Unit &amp; GUI Testing (together with Regression Testing)</td>
    <td>After every code change</td>
  </tr>
  <tr>
    <td>Compatibility Testing</td>
    <td>After every feature update</td>
  </tr>
  <tr>
    <td>Volume &amp; Stress Testing</td>
    <td>After every feature update</td>
  </tr>
  <tr>
    <td>Usability Testing</td>
    <td>After every milestone feature update</td>
  </tr>
</tbody>
</table>

#### Tools used

* [Cypress](https://www.cypress.io/)
* [PowerMapper](https://www.powermapper.com/products/sortsite/checks/browser-compatibility/)
* [Webpagetest](https://www.webpagetest.org/)
* [Google Forms](https://www.google.com/forms/about/)
* [Github Actions](https://github.com/features/actions)

### Interpretation of results

* Improvements to Fitness Calendar
	* <p align="justify">Survey results shows that that the function to toggle between daily and weekly view were unnecessary as a typical person would not exercise more than once a day. As such we removed the function and added a calendar refresh function.</p>
* Increased Functionalities
  * <p align="justify">Survey from the previous milestone shows that the website needs more features so that users will recommend it to others. Thus, we added a profile page to track user's IPPT progress and IPPT rewards to encourage them to get a better score.</p>
* Improvements to User Interface
	* <p align="justify">We made improvements to the layout of the elements and used a more descriptive name for buttons. There were also feedback that the tables were harder to read. Thus we made modifications to our CSS to make it more readable.</p>
* Improvements to User Experience
	* <p align="justify">We made our website more mobile friendly as it would be more convenient for users to access it on their phones. We also added an instructions page for functions that are not common (e.g Calendar and ITPT rewards).</p>
* Highlight Important Functionalities
	* <p align="justify">After removing certain functions from the previous milestone, the survey results indicates that the remaining and newly added functions are necessary and helpful for users as they use the app to try improve their IPPT score.</p>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

### Scope of Project

A Website that helps users plan their fitness schedule to meet their fitness goals easily.

#### Features to be completed by the mid of June

* A Website that the users can access to interact with the features implemented.
	* <p align="justify">A header bar that contains the links to other pages in the website, also containing the login feature where users can login with their google accounts through a popup.</p>
	* <p align="justify">A homepage that contains the calendar that allows users to create their exercise plan.</p>
	* <p align="justify">A calculator page that contains the in-built IPPT calculator that users can use to calculate their IPPT scores on-the-go.</p>
	* <p align="justify">A rewards page that is part of the gamification feature that will be elaborated further in the section on July features below.</p>

* Login feature powered by Firebase Authentication to allow users to sign in using their Gmail account.

* Fitness Planning feature where users can visualise their workout plan with the calendar.
	* Users can toggle the calendar view between month, week and day by clicking on the respective buttons.
	* To insert an event, users can click on the desired date and key in the details.
	* To view the event details, users can click on the “event block”.
	* They can drag the “event block” around to reschedule their workouts to fit into their personal schedule.
	* They are also able to export the calendar to .ics format to load into their personal calendars.

* IPPT Calculator allows users to gauge their current fitness levels based on the latest IPPT scoring requirements.
	* This calculator also displays the scores for each station.
	* <p align="justify">Lets the user know the additional requirements to improve their score by 1 point for each station. This will aid users in prioritising which station to focus on to improve their overall score.</p>

#### Features to be completed by the mid of July

* Gamification system. A trust-based, self-governed system that provides additional motivation for the user to meet their fitness goals through the gifting of points that can be used.
	* Reward points will be given to the user every time they complete an exercise in their exercise plan from the calendar.
	* The points given can be used to purchase avatars to customise the user profile.
* User profile
	* Contains general information about the user such as age, gender, name, etc.
	* Contains an avatar that represents the user (can be customised).
	* IPPT Goal setting
		* Users can set their desired ippt score.
		* They can also view their past IPPT scores to track the progress towards the goal.
* Recommended exercises to improve for each station in the IPPT.
	* Users can view a set of exercises to help them improve each station.
	* They can then add them to the calendar.

See the [open issues](https://github.com/ong-ck/ITpt/issues) for a full list of proposed features (and known issues).

### Development Plan

<table>
<tbody>
  <tr>
    <td>Before 15 May</td>
    <td>Finalise techstack to be used, meet up with advisor, work distribution, finalise scope of project. Start on poster and video.</td>
  </tr>
  <tr>
    <td>15 - 21 May</td>
    <td>Finalise poster and video. Create a mock up. Start learning the necessary technologies.</td>
  </tr>
  <tr>
    <td>22 - 28 May</td>
    <td>Learning of necessary technologies. Start implementing basic features of the website. Prepare Milestone 1 submission.</td>
  </tr>
  <tr>
    <td>29 - 30 May</td>
    <td>Refine Milestone 1 submission. Submission of Milestone 1 materials.</td>
  </tr>
  <tr>
    <td>5 - 11 June</td>
    <td>Improve IPPT calculator (shows user amount of reps needed to reach the next point). </td>
  </tr>
  <tr>
    <td>12 - 18 June</td>
    <td>Incorporate exercise recommendations for users to add into the calendar.</td>
  </tr>
  <tr>
    <td>19 - 25 June</td>
    <td>Testing and debugging. Prepare Milestone 2 submission.</td>
  </tr>
  <tr>
    <td>26 - 27 June</td>
    <td>Refine Milestone 2 submission. Submission of Milestone 2 materials.</td>
  </tr>
  <tr>
    <td>28 June - 4 July</td>
    <td>Add gamification system.</td>
  </tr>
  <tr>
    <td>5 - 11 July</td>
    <td>Add user profile view.</td>
  </tr>
  <tr>
    <td>12 - 18 July</td>
    <td>Add exercise recommendation feature.</td>
  </tr>
  <tr>
    <td>19 - 23 July</td>
    <td>Testing and debugging. Prepare Milestone 3 submission.</td>
  </tr>
  <tr>
    <td>24 - 25 July</td>
    <td>Refine Milestone 3 submission. Submission of Milestone 3 materials.</td>
  </tr>
</tbody>
</table>


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Readme Template referenced from othneildrew](https://github.com/othneildrew/Best-README-Template)
* [w3schools](https://www.w3schools.com/default.asp)
* [ICS Export Example by Jon Collette](https://codepen.io/jcollette/pen/ErELqY)
* [HubSpot HTML Dropdown Example](https://blog.hubspot.com/website/html-dropdown)
* [Tutorials Point Test Plan Example](https://www.tutorialspoint.com/test-plan-template-sample-document-with-web-application-example)

<p align="right">(<a href="#top">back to top</a>)</p>