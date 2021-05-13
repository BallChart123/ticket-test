# ticket-test

# Postman Collection

You Can Also Import to your Postman

`test.postman_collection.json`

# Command Run Docker

Start Docker First Before Build

To Build image

```
docker-compose build
```

To run the db:

```
docker-compose up -d chartchai_db
```

To run the backend

```
docker-compose up -d ticket_backend
```

To Access Database

```
docker exec -it chartchai_db psql -U chartchai postgres

```

To Stop Service

```
docker-compose down
```

# Folder Structure Conventions

> Folder structure options and naming conventions for software projects

You Can Also run test

```
npm test
```

### A typical top-level directory layout

    .app
    ├── controllers             # Controller files
    ├── models                  # Model files (storage model for sequelize (ORM))
    ├── routes                  # Routes files (path for api)
    ├── test                    # Automated tests (unit test)
    ├── util                    # Storage config
    └── ...

### Automated tests

    .
    ├── ...
    ├── test                    # Test files (alternatively `spec` or `tests`)
    │   └── controllers         # tests controllers
    │   └── routes              # tests routes
    └── ...
