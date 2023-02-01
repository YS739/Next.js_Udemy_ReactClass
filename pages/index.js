import MeetupList from "../components/meetups/MeetupList";
import { useEffect, useState } from "react";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Seville Plaza Meetup",
    image:
      "https://user-images.githubusercontent.com/112805225/215753580-0c0f16df-fcc5-4e58-bcad-1baa42c14a2a.jpg",
    address: "Seville plaza 1st",
    description: "This is a Tapas Tour!",
  },
  {
    id: "m2",
    title: "Space Trip",
    image:
      "https://user-images.githubusercontent.com/112805225/215754370-45b294c4-e7ab-4dda-bc70-c50b93f3f67c.jpg",
    address: "Space",
    description: "This is a Space Trip!",
  },
];

const HomePage = () => {
  // TODO: callback 사용하기..?
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // send a http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  });

  return (
    <div>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
};

// 오직 build할 때만 실행되는 코드
export async function getStaticPros() {}

export default HomePage;
