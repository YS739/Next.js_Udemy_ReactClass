import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// props = getStaticPros의 return 값
const HomePage = (props) => {
  return (
    <div>
      <MeetupList meetups={props.meetups} />
    </div>
  );
};

// 요청이 들어올 때마다 서버에 데이터 요청
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data form an API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

// 오직 build할 때만 실행되는 코드
export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://test:${process.env.NEXT_PUBLIC_MONGODB_PW}@cluster0.uvn1uhq.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // fetch data from an API
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
