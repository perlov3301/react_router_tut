import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import img1 from "../img1.png";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: img1,
    //     //"https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };
    return (
        <div id="contact">
          <div>
            <img
              key= {contact.avatar}
              src={contact.avatar || img1}
            />
          </div>

          <div>
            <h1>
              {
                contact.first||contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                    <i>No name</i>
                )
              }{" "}
              <Favorite contact={contact} />
            </h1>
            {
              contact.twitter && (
                <p>
                  <a target="_blank"
                    href={`https://twitter.com/${contact.twitter}`}
                    >
                      {contact.twitter} 
                  </a>
                </p>
              )
            }
            {contact.notes && <p>{contact.notes} </p> }
            <div>
              <Form action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form 
                method="post"
    //action matches the route at "contacts/:contactId/destroy"
    //as consequence Form sends this action to this route
                action="destroy" 
                onSubmit={(event) => {
                    if (
                        !confirm("please confirm deleting of record")
                       ) { event.preventDefault(); }
                }}
               >
                <button type="submit">Delete</button>
              </Form>
            </div>

          </div>
        </div>
    );
}

function Favorite({ contact }) {
    //yes, this is a 'let' for later
    let favorite = contact.favorite;
    return (
      <Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite ? "remove from favorites"
              : "add to favorites"
          }
        >
          {favorite ?   "★" : "☆"}
        </button>
      </Form>
    );
}