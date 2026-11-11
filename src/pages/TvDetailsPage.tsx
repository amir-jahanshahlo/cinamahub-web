import { useParams } from 'react-router'

function TvDetailsPage() {
  const { id } = useParams<'id'>()

  return (
    <section>
      <h1>TV Details</h1>
      <p>TV ID: {id}</p>
    </section>
  )
}

export default TvDetailsPage
