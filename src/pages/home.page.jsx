import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { requestForToken, onMessageListener } from "../firebase";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  // const [token, setToken] = useState("");
  useEffect(() => {
    console.log("... In Home Page ...");
    requestForToken();

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

    // This registration token comes from the client FCM SDKs.
    // const registrationToken = "YOUR_REGISTRATION_TOKEN";

    // const message = {
    //   data: {
    //     score: "850",
    //     time: "2:45",
    //   },
    //   token: registrationToken,
    // };

    // Send a message to the device corresponding to the provided
    // registration token.
    // getMessaging()
    //   .send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log("Successfully sent message:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error sending message:", error);
    //   });
  }, []);

  const sendMessage = () => {
    const body = {
      message: {
        token:
          "cZBaSVEUqrTfLHn64WsaVu:APA91bGKHyt_AGImY-OhbUH8tabJMvRFikgMpJ71nbYX55F5BWmRn3cRz2fMXXJRTxIsRNnsPMQAf0TVNTxBNGqlHUC1G7SFXOCFVFYI-YRov-fErXWCren23sOURnZuLlARjGuCwAtW",
        notification: {
          title: "FCM Message",
          body: "This is a message from FCM",
        },
      },
    };

    const options = {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Bearer ya29.A0AVA9y1tepiYKzDzpLJ7py790Hnm1iX1CPXkh4-ZznfTvjl_xsbJjfo8mGSWKKvGuLdksp7yJvi_w3J2XD7gUWQ51csHJWzoIy46F_kTjP5-fT_-sTktnxnaGa47Fa4jo-0GcUF8DeOsQGB70S2D48IIGJa1sYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4RS1ITXNKb2RQeF9DRTBiSVFZMnlsdw0163",
        "Content-Type": "application/json",
      }),
    };
    console.log(body);

    // https://fcm.googleapis.com/fcm/send

    fetch(
      "https://fcm.googleapis.com/v1/projects/fcm-notifications-c43cf/messages:send",
      options
    )
      .then((res) => console.log("RES => ", res))
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

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
            />
          </div>

          <div className="flex px-3 py-2 bg-amber-400 rounded-sm">
            <div className="px-4 bg-[#ffffff5c] mr-2 rounded-sm text-gray-700 font-medium w-[100px]">
              Message
            </div>
            <input
              className="px-2 text-sm w-5/6 focus:outline-none bg-amber-50"
              placeholder="Message"
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
