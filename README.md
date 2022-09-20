<div style="display: flex;justify-content: center">
<img style="" height="50%" src="src/Assets/Images/reactFast.png" width="50%" alt=""/>
</div>

# React Js structure for fast development

This project helps you to easily and quickly develop your web application using React JS

## Get Started

```
# git clone https://github.com/amirGhotb/react-fast.git
# cd react-fast
# npm i
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

Most of the code lives in the `src` folder and looks like this:

```
src
 |
 +-- Api                # contain files that are related to api 
 |
 +-- Assets             # Assets folder can contain all the static files such as images, fonts, etc.
 |
 +-- Core               # contain core project files which are written to use Routes, Context, Middlewares or ... easily in project
 |
 +-- Layouts            # contain Layout files, can make all kinds of layouts easily 
 |
 +-- Middlewares        # contain Middlewares files, can define Midllware quickly
 |
 +-- View               # contain project page files

```

## How use ?

### Routes

in `Routes.tsx` you can use array of `CRoute()` function to define your Routes:

```
CRoute({ 
            name: string,           // The name of the route that is used to call after that
            view: JSX.Element,      // view component of page in Views folder
            path: string,           // path in url
            exact?: boolean,        // exact option in react router
            middleware?: string     // The name of the middleware that created for this route
})
```

#### example

```
    new CRoute({
            name: 'users',
            view: Users(),          
            path: '/users',
            exact: true,
            middleware: 'admin'
        })
```

so you can use the `CGroup()` function in `Routes.tsx` to define a group of routes that have similar features

```
CGroup({
            prefix: string,                     // prefix for path in url
            middleware?: string,                // the name of the middleware that created for this group of routes
            layoutName?: string,                // the name of the layoute that created for this group of routes
            childes: Array<CRoute | CGroup>     // array of routes or group of routes
})
```

#### example

```
new CGroup({
                prefix: 'admin',
                layoutName: 'panel-layout',
                middleware: 'admin'
                childes: [
                    new CRoute({
                        name: 'home',
                        view: PanelHome(),
                        path: ''                // show this page in '/admin'
                    }),
                     new CRoute({
                        name: 'users',
                        view: PanelUsers(),
                        path: 'users'           // show this page in '/admin/users'
                    }),
                ]
})
```

#### full example

```
\\Routes.tsx

function routes(): Array<CRoute | CGroup> {
    return [
        new CRoute({
            name: 'users',
            view: Users(),
            path: '/users',
            exact: true,
            middleware: 'admin'
        }),
        new CGroup({
                prefix: 'admin',
                layoutName: 'panel-layout',
                middleware: 'admin'
                childes: [
                    new CRoute({
                        name: 'home',
                        view: PanelHome(),      
                        path: ''                // show this page in '/admin'
                    }),
                     new CRoute({
                        name: 'users',
                        view: PanelUsers(),
                        path: 'users'           // show this page in '/admin/users'
                    }),
                ]
        })
    ]
}

```

### Layouts

for make new layout, first make layout file in `/Layouts` folder

```
\\ Layouts/Public.tsx

export function Public(children: JSX.Element): JSX.Element {
    return <div>
    
        //...content of layout
        
        {children}              // this is required
    </>
}
```

and define this in `Layout/index.tsx`

```
export default function (children: JSX.Element): { [key: string]: JSX.Element } {
    return {
        public: Public(children),      // layouteName : layout component
        ...
    }
}
```

### It will be written soon ...
