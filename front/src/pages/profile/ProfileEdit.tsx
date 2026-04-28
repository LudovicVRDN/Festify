
import type { Iinputs } from '../../types/inputsForm.interface'


const Profile = () => {
    const connectionFields: Iinputs[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      rules: {
        required: "Adresse Email requise",
        validate: (v: any) => String(v).includes(".") || "Format incorrect",
      },
    },
    {
      name: "password",
      label: "Mot de Passe",
      type: "password",
      placeholder: "Mot De Passe",
      rules: {
        required: "Mot de passe requis",
        minLength: { value: 8, message: "Trop court (8 min)" },
        validate: {
          hasUpperCase: (v: any) =>
            /[A-Z]/.test(v) || "Doit contenir une majuscule",
          hasLowerCase: (v: any) =>
            /[a-z]/.test(v) || "Doit contenir une minuscule",
          hasNumber: (v: any) => /[0-9]/.test(v) || "Doit contenir un chiffre",
          hasSpecial: (v: any) =>
            /[^A-Za-z0-9]/.test(v) || "Doit contenir un caractère spécial",
        },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirmer le MDP",
      type: "password",
      placeholder: "Confirmer le mot de passe",
      rules: {
        required: "Veuillez confirmer le mot de passe",
        validate: (value: any) =>
          value === value || "Les mots de passe ne correspondent pas",
      },
    },
    ] 

    const profileFiels :Iinputs[] =[
         {
      name: "profile.nom",
      label: "Nom",
      type: "text",
      placeholder: "Nom",
      rules: { required: "Inscrit ton nom" },
    },
    {
      name: "profile.prenom",
      label: "Prénom",
      type: "text",
      placeholder: "Prénom",
      rules: { required: "Inscrit ton prénom" },
    },
    {
      name: "profile.adresse",
      label: "Adresse",
      type: "text",
      placeholder: "Adresse",
      rules: { required: "Adresse obligatoire" },
    },
    {
      name: "profile.codePostal",
      label: "Code Postal",
      type: "number",
      placeholder: "Code Postal",
      rules: { required: "Code postal obligatoire" },
    },
    {
      name: "profile.ville",
      label: "Ville",
      type: "text",
      placeholder: "Ville",
      rules: { required: "Ville obligatoire" },
    },
    ]
  return (
    <div>
      <h1>Informations de connexion:</h1>
    </div>
  )
}

export default Profile
