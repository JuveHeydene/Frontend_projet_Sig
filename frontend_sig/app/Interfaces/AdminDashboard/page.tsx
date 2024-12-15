
"use client"
import react from "react"
import { useState,useEffect } from "react"
import Image from "next/image"


interface userinfo {
        id: number;
        name: string;
        role:string;
}

interface createuser {

        noms :string,
        prenoms :string,
        birthdate:string,
         gender :string,
         role :string,
         bureau :string,
}

interface Circonscription{
  nom:string,
  circonscriptionname:string
}

interface BureauVote{
  nom:string,
  circonscriptionname:string
}


const AdminPage=()=>{


        const [formData ,setFormData]= useState <userinfo>({
                id:0,
                name:"",
                role:"",
              })
        
              const [formUser, setFormUser] = useState<createuser>({
                noms: "",
                prenoms: "",
                birthdate: "",
                gender: "",
                role: "",
                bureau: "",
              });

              const [formcirconsription ,setcirconsription]= useState <Circonscription>({
                nom:"",
                circonscriptionname:"",
              })

              const [formBureauvote ,setBureauvote]= useState <BureauVote>({
                nom:"",
                circonscriptionname:"",
              })


        const [isopenregion,setIsopenregion]=useState(true);
        const [isopencreateuser,setIsopencreateuser]=useState(false);
        const [isopenallusers,setIsopenallusers]=useState(false);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [iscreatecenter, setIscreatecenter] = useState(false);
        const [isbureaudevote, setIsbureaudevote] = useState(false);

        const [role, setRole] = useState("");

        const [activeItem, setActiveItem] = useState("Dashboard"); // Track active menu item
        const [isCollapsed, setIsCollapsed] = useState(false); // Track sidebar state
      
        const menuItems = [
          { id: "Menu", icon: "/Images/icons8_menu_99px 1.png", label: "Menu" },
          { id: "Dashboard", icon: "/Images/icons8_dashboard_layout_99px 1.png", label: "Dashboard" },
          { id: "HomePage", icon: "/Images/icons8_home_99px 1.png", label: "Home Page" },
          { id: "AllUsers", icon: "/Images/icons8_staff_99px_1 1.png", label: "All Users" },
          { id: "CreateUsers", icon: "/Images/icons8_add_administrator_99px 1.png", label: "Create Users" },
          { id: "VotingCenter", icon: "/Images/icons8_location_99px_1 1.png", label: "Create Center" },
          { id: "Favorite", icon: "/Images/icons8_rating_99px 1.png", label: "Create VoteOffice" },
          { id: "Settings", icon: "/Images/icons8_settings_99px 1.png", label: "Settings" },
          { id: "AdvancedParameters", icon: "/Images/icons8_menu_99px 1.png", label: "ADVANCE PARAMETERS" },
          { id: "AboutElection", icon: "/Images/Info Popup.png", label: "About Election" },
          { id: "LightDarkMode", icon: "/Images/Sun.png", label: "Light/Dark Mode" },
          { id: "Logout", icon: "/Images/Logout Rounded.png", label: "Log Out" },
        ];



        const [circonscriptions, setCirconscriptions] = useState<string[]>([
          "Circonscription A",
          "Circonscription B",
          "Circonscription C",
          "Circonscription D",
          "Circonscription E",
          "Circonscription F",
        ]);


          // Initial state with an array of users
  const [users, setUsers] = useState<userinfo[]>([
        { id: 1, name: "Juve", role: "Admin" },
        { id: 2, name: "James", role: "Moderator" },
        { id: 3, name: "Dave", role: "User" },
      ]);
    
      // State to handle editing
      const [isEditing, setIsEditing] = useState(false);
      const [currentUser, setCurrentUser] = useState({ id: 0, name: "", role: "" });
    
     
     
     
     
      const toggleModal = () => {
        setIsModalOpen(true); // Toggle the form visibility
      };
      const untoggleForm = () => {
        setIsModalOpen(false); // Toggle the form invisibility
      };
     
      // Delete a user
      const handleDelete = async (id: number) => {
        try {
          const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            setUsers(users.filter(a => a.id !== id));
          } else {
            console.error('Failed to delete user');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    
      // Start editing a user
      const handleEdit = (user: { id: number; name: string; role: string }) => {
        setIsEditing(true);
        setFormData(user);
      };
    
      // Handle input change during edit
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
      };


      const handleInputuserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
          setFormUser({
            ...formUser,
            [name]: value,
          });
      };

      const handleInputcirconscription = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setcirconsription({
            ...formcirconsription,
            [name]: value,
          });
      };

      const handleInputbureaudevote = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setBureauvote({
            ...formBureauvote,
            [name]: value,
          });
      };
    




      //create user submit
      const handleSubmitcreateuser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                const response = await fetch('http://localhost:3000/user/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify(formUser),
                });
                if (response.ok) {
                  alert('user created successfully!');
                } else {
                  console.error('Error creating user:', response.statusText);
                }
              } catch (error) {
                console.error('Error creating user:', error);
              }


              }





              //create center
      const handleSubmitcreatecenter = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                const response = await fetch('http://localhost:3000/center/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify(formcirconsription),
                });
                if (response.ok) {
                  alert('center created successfully!');
                } else {
                  console.error('Error creating center:', response.statusText);
                }
              } catch (error) {
                console.error('Error creating center:', error);
              }


              }



                //create Bureau de Vote
      const handleSubmitcreatebureauvote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                const response = await fetch('http://localhost:3000/bureau/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify(formcirconsription),
                });
                if (response.ok) {
                  alert('bureau created successfully!');
                } else {
                  console.error('Error creating bureau:', response.statusText);
                }
              } catch (error) {
                console.error('Error creating bureau:', error);
              }


              }


      // Save the edited user
      const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {

          console.log("Values of user edition ", formData);
          const response = await fetch('http://localhost:3000/user/eedition', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(formData),
          });
      
          console.log("Values of user edition ", formData);
          if (response.ok) {
            alert('User edited s successfully!');
            // Refetch the user data to update the list
            const fetchResponse = await fetch(`http://localhost:3000/user/getuser?userid=${formData.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            });
      
            if (fetchResponse.ok) {
              const updatedData: userinfo[] = await fetchResponse.json();
              setUsers(updatedData);
            } else {
              console.error('Error fetching updated floors:', fetchResponse.statusText);
            }
      
          } else {
            console.error('Error creating Floor:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating Floor:', error);
        }
        
        setIsEditing(false);
        setFormData({ id: 0, name: "", role: "" });
      };



      
        const handleToggleSidebar = () => {
          setIsCollapsed(!isCollapsed);
        };
      
        const handleMenuClick = (id: string) => {
          setActiveItem(id);

          switch (id) {
                case "Dashboard":
                  handleIsopenregion();
                  console.log("Dashboard clicked! Navigating to the dashboard...");
                 
                  break;
          
                case "CreateUsers":
                        handleIsopencreateuser();
                  
                  console.log("Opening the create user form...");
                  break;
          
                case "AllUsers":
                        handleIsopenallusers();
                  console.log("Users List");
                  
                 
                  break;

                case "VotingCenter":
                    handleIscreatecenters();
              
              console.log("Opening the voting center form...");
              break;

              case "Favorite":
                    handleIscreatebureuvote();
              
              console.log("Opening the bureu de vote form...");
              break;
          
                default:
                  console.log(`${id} clicked, but no specific action defined.`);
              }



        };


        const handleIsopenregion=()=>{
                if (isopenregion===false){
                        setIsopenregion(true);
                        setIsopencreateuser(false);
                        setIsopenallusers(false);
                        setIscreatecenter(false);
                        setIsbureaudevote(false);
                }
              }


        const handleIsopencreateuser=()=>{
                if (isopencreateuser===false){
                        setIsopencreateuser(true);
                        setIsopenregion(false);
                        setIsopenallusers(false);
                        setIscreatecenter(false);
                        setIsbureaudevote(false);
                }
              }
        const handleIsopenallusers=()=>{
                if (isopenallusers===false){
                        setIsopenallusers(true);
                        setIsopencreateuser(false);
                        setIsopenregion(false);
                        setIscreatecenter(false);
                        setIsbureaudevote(false);
                }
              }

        const handleIscreatecenters=()=>{
                if (iscreatecenter===false){
                        setIscreatecenter(true)
                        setIsopenallusers(false);
                        setIsopencreateuser(false);
                        setIsopenregion(false);
                        setIsbureaudevote(false);
                }
              }
              const handleIscreatebureuvote=()=>{
                if (isbureaudevote===false){
                        setIsbureaudevote(true);
                        setIscreatecenter(false)
                        setIsopenallusers(false);
                        setIsopencreateuser(false);
                        setIsopenregion(false);
                }
              }



              {/*useEffect(() => { 
                async function fetchData() {
                  try {
                    const response = await fetch('http://localhost:3000/user/getall', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*',
                      },
                    });
            
                    if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                    }
            
                    const data: userinfo[] = await response.json();
                    setUsers(data);
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
            
                fetchData();
              }, []); */}


               {/*useEffect(() => { 
                async function fetchData() {
                  try {
                    const response = await fetch('http://localhost:3000/circonscription/getall', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*',
                      },
                    });
            
                    if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                    }
            
                    const data: Circonscription[] = await response.json();
                    setcirconsription(data);
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
                }
            
                fetchData();
              }, []); */}


    return(
        <div>

            {/*Navbar */}
            <div className="relative w-full h-24 bg-gray-900">
            <div className="flex flex-row justify-between ">

                        <div className="flex flex-row">
                                <Image src="/Images/icons8_dashboard_layout_99px 2.png" alt="Image 1" width={40} height={40} />
                                <h1 className="text-bold  text-white text-3xl">DASHBOARD</h1>
                        </div>

                        <div className="flex flex-row">
                                <Image src="/Images/icons8_male_user_99px 1.png" alt="Image 1" width={40} height={40} />
                                <Image src="/Images/icons8_menu_vertical_99px 1.png" alt="Image 1" width={40} height={40} />
                        </div>
              </div>
               
            

            </div>

            <div className=" flex flex-row">
                    {/*Side bar */}
                    <div
      className={`flex flex-col gap-y-4 bg-black h-screen ${
        isCollapsed ? "w-20" : "w-72"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="ml-auto mr-4 mt-3 cursor-pointer" onClick={handleToggleSidebar}>
        <Image
          src="/Images/Back To.png"
          alt="Toggle Sidebar"
          width={20}
          height={20}
        />
      </div>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => handleMenuClick(item.id)}
          className={`flex items-center ml-4 gap-x-5 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeItem === item.id
              ? "bg-slate-600 text-black"
              : "text-white hover:bg-slate-500"
          }`}
        >
          <Image src={item.icon} alt={`${item.label} Icon`} width={20} height={20} />
          {!isCollapsed && <h1 className="text-bold">{item.label}</h1>}
        </div>
      ))}
    </div>


                    {/*Region section */}
                    {isopenregion && <div className=" relative border border-red-700 w-full">


                <div className="ml-[590px] mt-8">

                        <div className="w-full max-w-[400px]">
                        <input
                        type="text"
                        className= " block w-full max-w-[400px]  h-10 border bg-white border-gray-300 rounded-md p-2 "  
                        name="username"
                        placeholder="Search"/> 
                        </div>
                                
                </div>

                        <div className="ml-20 mb-8">
                        <h1 className="text-3xl font-extrabold text-black">REGIONS</h1>
                        <div className="border border-gray-950 w-36"></div>
                        </div>

                        <div className=" ml-24 grid grid-cols-3 gap-x-4 gap-y-12  mdn:grid-cols-1">

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>

                                <div>
                                <Image src="/Images/Folder.png" alt="Image" width={100} height={100} />
                                <h2>FAR-NORTH</h2>
                                </div>



                        </div>

                       
                       

                    </div>}

                    {/* FORMULAIRE POUR CREE UN UTILISATEUR */}

                    {isopencreateuser && 

                    <div className="w-full"> 
                        <form onSubmit={handleSubmitcreateuser} className="p-6 bg-gray-100 w-full  rounded">
      <h1 className="text-xl font-bold mb-4">Formulaire</h1>

      {/* Noms */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="noms">
          Noms
        </label>
        <input
          id="noms"
          type="text"
          value={formUser.noms}
          onChange={handleInputuserChange}
          placeholder="Entrer le nom"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Prénoms */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="prenoms">
          Prénoms
        </label>
        <input
          id="prenoms"
          type="text"
          value={formUser.prenoms}
          onChange={handleInputuserChange}
          placeholder="Entrer le prénom"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Date de naissance */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="birthdate">
          Date de naissance
        </label>
        <input
          id="birthdate"
          type="date"
          value={formUser.birthdate}
          onChange={handleInputuserChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Genre</label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              value={formUser.gender}
          onChange={handleInputuserChange}
              name="gender"
              className="mr-2"
            />
            Homme
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value={formUser.gender}
          onChange={handleInputuserChange}
              
              className="mr-2"
            />
            Femme
          </label>
        </div>
      </div>

      {/* Rôle */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="role">
          Rôle
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Sélectionnez un rôle --</option>
          <option value="candidat">Candidat</option>
          <option value="enrolleur">Enrôleur</option>
          <option value="scrutateur">Scrutateur</option>
          <option value="moderateur">Modérateur</option>
        </select>
      </div>

      {/* Bureau de vote (affiché uniquement si le rôle est "Scrutateur") */}
      {role === "scrutateur" && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="bureau">
            Bureau de vote
          </label>
          <input
            id="bureau"
            type="text"
            value={formUser.bureau}
          onChange={handleInputuserChange}
            placeholder="Entrer le bureau de vote"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}

     
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Soumettre
      </button>
    </form>
                    </div> 


                     }
        {/*Affichage des Utilisateur */}
                     {isopenallusers &&  <div className=" bg-gray-100 flex  p-6 w-full">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">List of Users</h1>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Role</th>
              <th className="border-b p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <button
                    className="text-blue-500 hover:underline mr-4"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => toggleModal()}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isEditing && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Edit User</h2>

            <form onSubmit={handleSave}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 rounded-md"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="border p-2 rounded-md"
              >
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>
              <button type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
            </form>



          </div>
        )}

           {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-custom-bluewhite text-blue-950 rounded-lg shadow-md p-6 max-w-2xl w-full relative">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={untoggleForm}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(formData.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}



      </div>
    </div>}


    {/* FORMULAIRE POUR CREE UN CENTRE DE VOTE  */}

    {iscreatecenter && 
    
    <div className="w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Ajouter un Centre de vote </h1>
      <form onSubmit={handleSubmitcreatecenter}>
        {/* Champ Nom */}
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
            Nom
          </label>
          <input 
            type="text"
            id="nom"
            name="nom"
            value={formcirconsription.nom}
            onChange={handleInputcirconscription}
            placeholder="Entrez le nom"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Liste déroulante pour Circonscription */}
        <div className="mb-4">
          <label
            htmlFor="circonscriptionname"
            className="block text-gray-700 font-medium mb-2"
          >
            Circonscription
          </label>
          <select
            id="circonscriptionname"
            name="circonscriptionname"
            value={formcirconsription.circonscriptionname}
            onChange={handleInputcirconscription}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez une circonscription</option>
            {circonscriptions.map((circ, index) => (
              <option key={index} value={circ}>
                {circ}
              </option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Soumettre
        </button>
      </form>
    </div>
    
    }


    {/* FORMULAIRE POUR CREE UN BUREAU  DE VOTE  */}

    {isbureaudevote && 
    
    <div className="w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Ajouter un Bureau de vote </h1>
      <form onSubmit={handleSubmitcreatebureauvote}>
        {/* Champ Nom */}
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
            Nom
          </label>
          <input 
            type="text"
            id="nom"
            name="nom"
            value={formBureauvote.nom}
            onChange={handleInputbureaudevote}
            placeholder="Entrez le nom"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Liste déroulante pour Circonscription */}
        <div className="mb-4">
          <label
            htmlFor="circonscriptionname"
            className="block text-gray-700 font-medium mb-2"
          >
            Circonscription
          </label>
          <select
            id="circonscriptionname"
            name="circonscriptionname"
            value={formBureauvote.circonscriptionname}
            onChange={handleInputbureaudevote}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez une circonscription</option>
            {circonscriptions.map((circ, index) => (
              <option key={index} value={circ}>
                {circ}
              </option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Soumettre
        </button>
      </form>
    </div>
    
    }



            </div>
             
        </div>
    )
}

export default AdminPage