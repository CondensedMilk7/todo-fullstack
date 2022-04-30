# DoStack - A fullstack "to do" app built with Angular & Nestjs

In order to start the app (in development):

clone this repository, navigate into the project directory and install dependencies with

```
npm install
```

Then run backend and frontend servers on two separate terminal instances.

On one of them, run

```
ng serve api
```

And on the other

```
ng serve
```

Now open your browser and go to `localhost:4200`.

The app uses sqlite as database, which will eventualy be replaced by postgres in production.
