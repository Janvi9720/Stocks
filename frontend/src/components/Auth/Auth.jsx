// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AUTH_ERROR_OCCURRED } from "../../constants/actions";
// import { useAuth0 } from "../../react-auth0-spa";

// const Auth = () => {
//   const errors = useSelector((state) => state.authErrorsReducer);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { loginWithRedirect } = useAuth0();

//   useEffect(() => {
//     loginWithRedirect({
//       appState: { targetUrl: "/auth" },
//     });
//     dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
//     return () => {
//       dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
//     };
//   }, [dispatch, loginWithRedirect]);

//   return (
//     <>
//       {!isLoading && !errors && (
//         <div className="flex justify-center items-center h-[100vh]">
//           <div className="loader"></div>
//         </div>
//       )}
//       <style jsx>{`
//         .loader {
//           width: 180px;
//           height: 40px;
//           -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) 0/20%;
//           background: linear-gradient(#367bf3 0 0) 0/0% no-repeat #ddd;
//           animation: l4 2s infinite steps(6);
//         }
//         @keyframes l4 {
//           100% {
//             background-size: 120%;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Auth;
