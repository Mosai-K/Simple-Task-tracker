# Task Tracker

**Simple-Task-Tracker** is a simple task management application built with **Angular**. This project helps you manage and track tasks efficiently in a user-friendly interface.

---

## Project Setup - Client

This project was generated using **Angular CLI version 18.2.21**.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- [Angular CLI](https://angular.io/cli) (v18.2.21)  

### Development Server

To run a development server:

```bash
ng serve
```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Folder Structure
```bash
client/
├── src/                 # Application source code
├── angular.json         # Angular CLI configuration
├── package.json         # Node dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```
---
## Project Setup - Server

This project includes a .NET Web API located in the **server/TaskTrackerAPI directory**.

### Prerequisites

- [.NET SDK]([https://dotnet.microsoft.com/en-us/download/dotnet/10.0]) (v10 recommended)  
- [Entity Framework CLI Tools] 

---

### Development Server

If EF tools are not installed:

```bash
dotnet tool install --global dotnet-ef
```

### Running API

- Navigate to `cd server/TaskTracker.API`
- Apply database migrations `dotnet ef database update`
- Run the API `dotnet run `.

The API will be available at:

[http://localhost:5139]

The project uses SQLite for simplicity and portability.

### Folder Structure
```bash
server/
├── TaskTracker/                 
├──- TaskTracker.API/         
├──- TaskTracker.Tests/         
└──- TaskTracker.sln      
```
### Future Improvements

1. Add authentication and authorization (JWT-based security)
2. Associate tasks with individual users
