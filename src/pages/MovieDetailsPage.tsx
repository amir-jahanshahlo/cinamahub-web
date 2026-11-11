import { useParams } from "react-router";

function MovieDetailsPage() {
  const { id } = useParams<"id">();

  return (
    <section>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
    </section>
  );
}

export default MovieDetailsPage;
