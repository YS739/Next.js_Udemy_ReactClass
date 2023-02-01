import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://test:${process.env.NEXT_PUBLIC_MONGODB_PW}@cluster0.uvn1uhq.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // find의 첫번째 값은 가져오고 싶은 데이터, 모두 가져오려면 빈 배열
  // 두 번째는
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// getStaticProps 안에서 useRouter 쓸 수 없음.
// context로 id에 접근 가능
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://test:${process.env.NEXT_PUBLIC_MONGODB_PW}@cluster0.uvn1uhq.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    // 강의에서는 new 없이 썼는데 new를 쓰라는 오류가 떠서 써줬더니 오류 해결
    _id: new ObjectId(meetupId),
  });
  console.log("selectedMeetup :>> ", selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
