import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://user-images.githubusercontent.com/112805225/215753580-0c0f16df-fcc5-4e58-bcad-1baa42c14a2a.jpg"
      title="Seville Plaza Meetup"
      address="Seville plaza 1st"
      description="This is a Tapas Tour!"
    />
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: { meetupId: "m1" },
      },
      {
        params: { meetupId: "m2" },
      },
    ],
  };
}

// getStaticProps 안에서 useRouter 쓸 수 없음.
// context로 id에 접근 가능
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("meetupId :>> ", meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://user-images.githubusercontent.com/112805225/215753580-0c0f16df-fcc5-4e58-bcad-1baa42c14a2a.jpg",
        id: meetupId,
        title: "Seville Plaza Meetup",
        address: "Seville plaza 1st",
        description: "This is a Tapas Tour!",
      },
    },
  };
}

export default MeetupDetails;
