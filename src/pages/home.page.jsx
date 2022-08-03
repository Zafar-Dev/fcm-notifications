import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { requestForToken, onMessageListener } from "../firebase";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    console.log("... In Home Page ...");
    requestForToken().then((token) => {
      console.log("Token ID => ", token);
      setToken(token);
    });

    onMessageListener()
      .then((payload) => {
        console.log("OnMessageListner => ", payload);
        toast(payload.notification.body, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  const sendMessage = useCallback(() => {
    const body = {
      topic: "hey topic",
      title,
      description: desc,
      token: [token],
    };

    const options = {
      // mode: "no-cors",
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };

    console.log("====================Request===================\n", body);

    fetch("https://rao-fcm-notifications.herokuapp.com/notifications/", options)
      .then((res) => console.log("RES => ", res))
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [title, desc, token]);

  return (
    <div>
      <nav className="w-full text-center py-4 bg-violet-800 text-white font-medium text-lg">
        Firebase Notification with React
      </nav>

      <section className="">
        <div className="w-[350px] flex flex-col gap-4 mt-28 mx-auto rounded-md">
          <div className="flex px-3 py-2 bg-amber-400 rounded-sm">
            <div className="px-4 bg-[#ffffff5c] mr-2 rounded-sm text-gray-700 font-medium w-[110px]">
              Title
            </div>
            <input
              className="px-2 text-sm w-5/6 focus:outline-none bg-amber-50"
              placeholder="Title"
              onChange={(v) => setTitle(v.target.value)}
            />
          </div>

          <div className="flex px-3 py-2 bg-amber-400 rounded-sm">
            <div className="px-4 bg-[#ffffff5c] mr-2 rounded-sm text-gray-700 font-medium w-[100px]">
              Message
            </div>
            <input
              className="px-2 text-sm w-5/6 focus:outline-none bg-amber-50"
              placeholder="Message"
              onChange={(v) => setDesc(v.target.value)}
            />
          </div>

          <div>
            <div
              className="text-sm px-3 py-1 bg-[#fcd673] hover:bg-amber-400 shadow-sm inline-block rounded-sm text-gray-700 font-medium cursor-pointer w-[130px]"
              onClick={() => sendMessage()}
            >
              Send Message
            </div>
          </div>
        </div>

        <div className="w-[350px] mx-auto mt-8">
          <h1 className="text-violet-800 font-medium text-lg">Messages</h1>
          <div className="h-[1px] bg-violet-800"></div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default HomePage;
