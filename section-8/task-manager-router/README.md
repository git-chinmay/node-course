## task manager router

- in task-manager folder we have kept all the routes for both user and task models in single index.js file. which is not efficient and it keep on grwoing when we will add new endpoints and eventually it will become difficult to manage. Hence its advisable to split them and manage them separately.

- We will use new feature called express router