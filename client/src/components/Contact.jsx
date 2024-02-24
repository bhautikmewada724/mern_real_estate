import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact(listing) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);
  console.log(landLord);
  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for
            <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            className="w-full border p-3 rounded-lg"
            placeholder="Enter Your Message"
            name="message"
            id="message"
            cols="30"
            rows="2"
            value={message}
            onChange={onChange}
          ></textarea>
          <Link
            className="bg bg-slate-700 text-center p-3 uppercase rounded-lg hover:opacity-95"
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
