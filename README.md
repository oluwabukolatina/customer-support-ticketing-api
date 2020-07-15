## Test Project

The project is designed to be simple and reasonable in size to enable you to demonstrate your enterprise-class skills. It is designed to test your knowledge of RESTful API design, database design, documentation, design patterns and problem-solving skills.

## Instructions

Try to complete as much as possible within the given time frame. If you need more time please ask for an extension. You must complete full-functionality of the application with industry-level coding style/commenting. Unfinished assignments will not be considered.

Please note that you are expected to work on the assignment independently. Discussing assignments details with colleagues or any indication of outside help will be considered cheating.

Please do not expect too much hand-holding as this is an evaluation assignment.

Read the complete assignment before you start. Understand clearly what is required so that your work will be appropriate and easier.

## Overall objective

Create the architecture and design of a customer support ticketing system. Implement the system’s services and applications.

## Prerequisites

The following prerequisites must be respected.
Use the Node.js and Express technology stack for development along with any compatible open technologies.
Use Mongodb, Mongoose, and development environment tools according to the technology stack.
Do not use any proprietary technologies or tools that are not available for evaluation.

## Functional Requirements

The system allows customers to be able to place support requests, and support agents to process the request. The system implements the following specifications.

## For customers
- Create support requests
- View the status of the previous - requests.
- Comment on a support request.

## For support agents
- Find and process support requests.
- One report on requests data with all tickets closed in the last one month. It should be CSV or PDF exportable

## Other functional requirements
## done
- Users should be able to authenticate normally with JWT.

- An admin user should be able to manage other users and any other system objects.
- Comment feature for a follow-up conversation between a customer and a support agent. Note that a customer can only comment on a ticket if and only if a support agent has commented on the ticket.

Assume any functional details required to achieve the above based on logic and your experience.

## Other Technical and Non-functional Requirements

The following list of technical specifications must be adhered to

Use Mongodb, Express and Typescript on the backend. Use the latest versions if possible.
On backend: REST API, Unit tests with Jest/Mocha and if possible, integration test with Cypress.
Enough coverage of proofing automated tests on the backend.

## What we will evaluate

- Efficacy of your submission: fundamentally how well your solution is able to achieve the assignment objective and solve the stated problem.
- Code quality
- Code modularity
- Application organization across files and within each file - please ensure you follow the framework standards where necessary.
- Code documentation - balancing between self-documenting code and comments
- Unit and integration testing
- Exception handling anywhere available and expected in the frameworks you are using.
- For any technology used, the correct usage of that technology based on consecrated best practices
- Design
- Clarity and completeness of readme and design documents
- Fitness of the solution to a problem.
- Consideration for the efficiency of communication flows between frontend and backend, if applicable.
- Functional completeness.
## Scoring ratio matric (out of 10), all of these are individually mandatory so don’t skip any:
- Design quality = 3
- Code quality = 3
- Specifications compliance = 4

## What to Deliver
- Database Scripts
- Create a script file that shows the steps in creating the database, and export in JSON or CSV the seed data used for testing.

## Readme Document
Create a text file with the following information
- Instructions to install and configure prerequisites or dependencies, if any.
- Instructions to create and initialize the database (if required)
- Assumptions you have made -- it is good to explain your thought process and the assumptions you have made
- Requirements that you have not covered in your submission if any.
- Instructions to configure and prepare the source code to build and run properly.
- Issues you have faced while completing the assignment if any.
- Constructive feedback for improving the assignment.

## Source Code
- You must deliver all the implemented source code including any dependencies. For the dependencies that could not be included due to size, the readme file must have proper instructions on how to download and install them


## How to Submit

Create a repo with any of the preferred platforms (Gitlab, Github, Bitbucket, etc) and engineering@fliqpay.com to the repo for reviewing your submission.


## Submission

## User Levels
-customer
-admin
## super admin
- deleteRequest
- getAllCustomers
- getAllAdmins
- upgradeAdminRole
- getOneUser
- deleteAdmin

## Technologies Used
- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [ESLint](https://eslint.org/) 
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) 
- [JWT](https://www.npmjs.com/package/jsonwebtoken) 

## Installations

#### Setup
- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm run start:dev
  ```
- Use `http://localhost:4200/api/v1/fliqpay` as base url for endpoints
- Live url `https://dry-shore-88633.herokuapp.com/`
- API Doc `https://documenter.getpostman.com/view/4223397/T17Q5jGU?version=latest`

## API Endpoints

| METHOD | DESCRIPTION                            | ENDPOINTS                                |
| ------ | -------------------------------------- | ---------------------------------------- |
| POST    | Register A User                      | `/auth/register`                   |
| POST   | Login a user                        | `/auth/login`           |
| POST   | Create a request                        | `/customer/request`           |
| GET   | Get all a signed in user requests                         | `/customer/request`           |
| GET   | Get a single signed in user request                      | `/customer/request/:id`           |
| GET   | get all requests                      | `/admin/request`           |
| GET   | get a single request                     | `/admin/request/:id`           |
| PUT   | CLOSE a request                     | `/admin/request/:id`           |
| POST   | comment on a request                     | `/customer/comment/request/:id`           |
| POST   | ADMIN COMMENT on a request                     | `/admin/comment/request/:id`           |
| DELETE   | delete a request                     | `/super-admin/request/:id`           |
| get   | get all customers                     | `/super-admin/customer`           |
| GET   | delete all admins                     | `/super-admin/admins`           |
| GET   | delete all admins                     | `/super-admin/admins`           |
| put   | upgrade admin                     | `/super-admin/admin/upgrade/id`           |
| delete   | delete admin                     | `/super-admin/admin/id`           |



## Author

- [Tina](https://github.com/oluwabukolatina)

