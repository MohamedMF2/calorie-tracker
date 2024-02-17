import { Link, useParams } from "react-router-dom";

export function DetailsPage() {
  const params = useParams();

  return (
    <>
      <p>this is record with id: {params.recordId} </p>
      <Link to=".."relative="path"> back to list page </Link>
    </>
  );
}
