import { Outlet, 
        //  Link, 
         NavLink,
         useLoaderData,
         Form,
         redirect,
         useNavigation,
         useSubmit,
 } from "react-router-dom";
import { getContacts, createContact } from "../contacts.js";
import { useEffect } from "react";
//react router sends from <Form> request to a route 'action' and after ward
//revalidates the data="useState"+"onSubmit"+"useEffect" are up to date
export async function action() {
  const contact = await createContact();
  // return {contact};
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
// filter the list if there are URLSearchParams
// this is not post, so the filter is here
  const url = new URL(request.url);
// 'q' is 'name' within <input> => '?q=' within URL
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
    const { contacts, q } = useLoaderData();// default is to bring data
    const navigation = useNavigation();
    const asubmit = useSubmit();

// add spinner
    const searching = 
      navigation.location && 
      new URLSearchParams(navigation.location.search).has("q");
//filtering happen on every stroke
    useEffect(() => {
  // when we refresh page after searching we still have  searched values
      document.getElementById("q").value = q;
    }, [q]);

    return (
       <>
          <div id="sidebar">
            <h1>(React Router) Contacts</h1>
            <div>
          {/* default method of form is 'get' => form data will
              be put into 'URLSearchParams' of a GET request
          */}
                <Form id="search-form" role="search">
  {/*browser serializes form by the 'name' of <input>=>'?q=' in url */}
                    <input id="q"
                      aria-label="Search contacts"
                      placeholder="Search"
                      type="search"
                      name="q"
                      defaultValue={q}
                      onChange={(event)=>{
        // console.log(`rootjsx;submit.currentTarget:${event.currentTarget.form}`);
                        asubmit(event.currentTarget.form);
                      }}
                    />
                    <div id="search-spinner" aria-hidden hidden={true} />
                    <div className="sr-only" aria-live="polite"></div>
                </Form>
                <Form method="post" >
                    <button type="submit">New</button>
                </Form>
            </div>
            <nav>
              { contacts.length ?
                (
                  <ul>
                    {contacts.map((contact)=> (
                      <li key={contact.id}>
                        <NavLink 
                            to={`contacts/${contact.id}`}
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "active"
                                : isPending
                                ? "pending"
                                : ""
                            }
                        >
                          {contact.first||contact.last ? (
                            <>{contact.first} {contact.last} </>
                          ):(<i>no Name</i> )
                          }{" "}
                          {contact.favorite && <span>★</span>}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : ( <p><i>no contacts</i></p> )
              }  
            </nav>
          </div>
          <div 
            id="detail"
            className={
              navigation.state === "loading" ? "loading" : ""
            }
          >
            <Outlet />
          </div>
       </>
    );
}