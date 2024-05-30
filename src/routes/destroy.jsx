import {  redirect } from "react-router-dom";
import { deleteContact } from "../contacts.js";
// import {useNavigate} from "react-router-dom";

export async function action({ params}) {
  console.log(`destroyjsx;Id:${params.contactId}`);
  // const navigate = useNavigate();
  // if (!params.contactId) { navigate(-1); }
  await deleteContact(params.contactId);
// after this action redirects useLoaderData returns new values
  return redirect("/");
}

