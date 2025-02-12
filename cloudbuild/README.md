
# Cloud Build Approach
## Pipeline by service and environment

/cloudbuild/
  /$service/
      ├── dev.yaml       # Development environment
      ├── staging.yaml   # Staging or preproduction
      └── prod.yaml      # Main or production
  /$new-service/
      |── dev.yaml       # Development environment
      ├── staging.yaml   # Staging or preproduction
      └── prod.yaml      # Main or production
  
## Cloud Build Orchestration

dev.yaml (Cloud Build)
    │
    ├── gcr.io/cloud-builders/docker (tool/builder)
    │       │
    │       └── Exec: docker build ...
    │               │
    │               └── Lee Dockerfile
    │                       │
    │                       └── node:20-alpine
    │
    └── Result: custom-image

The orchestration works as follows:

1. Cloud Build reads the dev.yaml file
2. Finds the step with name: `gcr.io/cloud-builders/docker`
3. This builder executes the `docker build` ... command
4. The builder reads the Dockerfile into the `dir` (working path)
5. The Dockerfile uses `node:20-alpine` (or whatever) as the base image to build OUR application image
6. The resulting image is saved in *Artifact Registry* 

### Additional Notes
The gcr.io/cloud-builders/docker is a tool/builder that Cloud Build uses to run Docker commands
It's similar to running docker build locally, but within the Cloud Build environment
The final image is tagged and pushed to the specified Artifact Registry repository