import React from "react";
import Home from "./components/Home";
import PokemonDetails from "./components/pokemon/PokemonDetails";
import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { PokemonEvolution } from "./components/pokemon/PokemonEvolution";

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/details/:name' element={<PokemonDetails />} />
      <Route
        path='/details/:name/evolution/:id'
        element={<PokemonEvolution />}
      />
    </Route>
  )
);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
