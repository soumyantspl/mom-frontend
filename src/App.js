
// import './App.css';
// import Login from './components/Login/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';
// function App() {
//   const chekUserLogin=true
//   const checkClass=chekUserLogin?"main-content":"login-no-padding"
//   return (
//     <div className={checkClass}>
//       {chekUserLogin}
//       <Login />
//     </div>
//   );
// }

// export default App;



import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateRoutes from "./config/route";

const App =()=> {
  
    return <CreateRoutes />

}

export default App;
