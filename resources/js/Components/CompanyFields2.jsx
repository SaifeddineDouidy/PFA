import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CitySelect, CountrySelect, StateSelect } from 'react-country-state-city';
import "react-country-state-city/dist/react-country-state-city.css"
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const CompanyFields2 = ({data, setData, errors }) => {
  const { firstname, lastname, phoneNumber, country, companyName, companySize, jobTitle, desiredRecruitments } = data;
  

  return (
    <>
      <div className="py-2">
        <InputLabel htmlFor="firstname" value="First Name" />
        <TextInput
          id="firstname"
          name="firstname"
          type="text"
          value={firstname || ''}
          onChange={(e) => setData({ ...data, firstname: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.firstname} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="lastname" value="Last Name" />
        <TextInput
          id="lastname"
          name="lastname"
          type="text"
          value={lastname || ''}
          onChange={(e) => setData({ ...data, lastname: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.lastname} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="phoneNumber" value="Num Téléphone" />
        <PhoneInput
          country={'ma'}
          value={phoneNumber || ''}
          onChange={(phone) => setData({ ...data, phoneNumber: phone })}
          inputProps={{
            name: 'phoneNumber',
            id: 'phoneNumber',
            style: { width: '100%' }
          }}
        />
        <InputError message={errors.phoneNumber} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="country" value="Country" />
        <div className="flex flex-col gap-2">
        <select
          id="country"
          name="country"
          value={country || ''}
          onChange={(e) => setData({ ...data, country: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        >
          <option value="">Select Country</option>
          <option value="AF">Afghanistan</option><option value="ZA">Afrique du Sud</option><option value="AL">Albanie</option><option value="DZ">Algérie</option><option value="DE">Allemagne</option><option value="AD">Andorre</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctique</option><option value="AG">Antigua-et-Barbuda</option><option value="SA">Arabie saoudite</option><option value="AR">Argentine</option><option value="AM">Arménie</option><option value="AW">Aruba</option><option value="AU">Australie</option><option value="AT">Autriche</option><option value="AZ">Azerbaïdjan</option><option value="BS">Bahamas</option><option value="BH">Bahreïn</option><option value="BD">Bangladesh</option><option value="BB">Barbade</option><option value="BY">Bélarus</option><option value="BE">Belgique</option><option value="BZ">Belize</option><option value="BJ">Bénin</option><option value="BM">Bermudes</option><option value="BT">Bhoutan</option><option value="BO">Bolivie</option><option value="BQ">Bonaire, Saint-Eustache et Saba</option><option value="BA">Bosnie-Herzégovine</option><option value="BW">Botswana</option><option value="BR">Brésil</option><option value="BG">Bulgarie</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodge</option><option value="CM">Cameroun</option><option value="CA">Canada</option><option value="CV">Cap-Vert</option><option value="CL">Chili</option><option value="CN">Chine</option><option value="CY">Chypre</option><option value="CO">Colombie</option><option value="KM">Comores</option><option value="CR">Costa Rica</option><option value="CI">Côte d'Ivoire</option><option value="HR">Croatie</option><option value="CU">Cuba</option><option value="CW">Curaçao</option><option value="DK">Danemark</option><option value="DJ">Djibouti</option><option value="DM">Dominique</option><option value="EG">Égypte</option><option value="AE">Émirats Arabes Unis</option><option value="EC">Équateur</option><option value="ER">Érythrée</option><option value="ES">Espagne</option><option value="EE">Estonie</option><option value="US">États-Unis</option><option value="ET">Éthiopie</option><option value="FJ">Fidji</option><option value="FI">Finlande</option><option value="FR">France</option><option value="GA">Gabon</option><option value="GM">Gambie</option><option value="GS">Géorgie du Sud-et-les Îles Sandwich du Sud</option><option value="GE">Géorgie</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Grèce</option><option value="GD">Grenade</option><option value="GL">Groenland</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernesey</option><option value="GQ">Guinée équatoriale</option><option value="GN">Guinée</option><option value="GW">Guinée-Bissau</option><option value="GF">Guyane Française</option><option value="GY">Guyane</option><option value="HT">Haïti</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hongrie</option><option value="BV">Île Bouvet</option><option value="IM">Île de Man</option><option value="MU">Île Maurice</option><option value="NF">Île Norfolk</option><option value="PN">Île Pitcairn</option><option value="AX">Iles Åland</option><option value="KY">Îles Caïmans</option><option value="CC">Îles Cocos (Keeling)</option><option value="CK">Îles Cook</option><option value="FK">Îles Falkland (Malouines)</option><option value="FO">Îles Féroé</option><option value="HM">Îles Heard-et-MacDonald</option><option value="MP">Îles Mariannes du Nord</option><option value="MH">Îles Marshall</option><option value="UM">Îles Mineures éloignées des États-Unis</option><option value="SB">Îles Salomon</option><option value="WS">Îles Samoa</option><option value="TC">îles Turques-et-Caïques</option><option value="VG">Îles Vierges britanniques</option><option value="VI">Îles Vierges, États-Unis</option><option value="IN">Inde</option><option value="ID">Indonésie</option><option value="IQ">Irak</option><option value="IR">Iran</option><option value="IE">Irlande</option><option value="IS">Islande</option><option value="IL">Israël</option><option value="IT">Italie</option><option value="JM">Jamaïque</option><option value="JP">Japon</option><option value="JE">Jersey</option><option value="JO">Jordanie</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KG">Kirghizistan</option><option value="KI">Kiribati</option><option value="KW">Koweït</option><option value="LA">Laos</option><option value="SV">Le Salvador</option><option value="LS">Lesotho</option><option value="LV">Lettonie</option><option value="LB">Liban</option><option value="LR">Liberia</option><option value="LY">Libye</option><option value="LI">Liechtenstein</option><option value="CX">L'île Christmas</option><option value="LT">Lituanie</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macédoine</option><option value="MG">Madagascar</option><option value="MY">Malaisie</option><option value="MW">Malawi</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malte</option><option value="MA">Maroc</option><option value="MQ">Martinique</option><option value="MR">Mauritanie</option><option value="YT">Mayotte</option><option value="MX">Mexique</option><option value="FM">Micronésie</option><option value="MD">Moldavie</option><option value="MC">Monaco</option><option value="MN">Mongolie</option><option value="ME">Monténégro</option><option value="MS">Montserrat</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibie</option><option value="NR">Nauru</option><option value="BN">Negara Brunei Darussalam</option><option value="NP">Népal</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NO">Norvège</option><option value="NC">Nouvelle Calédonie</option><option value="NZ">Nouvelle-Zélande</option><option value="OM">Oman</option><option value="UG">Ouganda</option><option value="UZ">Ouzbékistan</option><option value="PK">Pakistan</option><option value="PW">Palaos</option><option value="PS">Palestine</option><option value="PA">Panama</option><option value="PG">Papouasie-Nouvelle-Guinée</option><option value="PY">Paraguay</option><option value="NL">Pays-Bas</option><option value="PE">Pérou</option><option value="PH">Philippines</option><option value="PL">Pologne</option><option value="PF">Polynésie française</option><option value="PR">Porto Rico</option><option value="PT">Portugal</option><option value="QA">Qatar</option><option value="SY">République arabe syrienne</option><option value="CF">République centrafricaine</option><option value="KR">République de Corée</option><option value="KP">République démocratique de Corée</option><option value="CD">République démocratique du Congo</option><option value="DO">République Dominicaine</option><option value="CG">République du Congo</option><option value="CZ">République Tchèque</option><option value="RE">Réunion</option><option value="RO">Roumanie</option><option value="GB">Royaume-Uni</option><option value="RU">Russie</option><option value="RW">Rwanda</option><option value="EH">Sahara occidental</option><option value="BL">Saint Barthélemy</option><option value="SM">Saint Marin</option><option value="KN">Saint-Christophe-et-Niévès</option><option value="SH">Sainte-Hélène, Ascension et Tristan da Cunha</option><option value="LC">Sainte-Lucie</option><option value="MF">Saint-Martin (Antilles françaises)</option><option value="SX">Saint-Martin (Royaume des Pays-Bas)</option><option value="PM">Saint-Pierre-et-Miquelon</option><option value="VA">Saint-Siège (État de la Cité du Vatican)</option><option value="VC">Saint-Vincent-et-les-Grenadines</option><option value="AS">Samoa américaines</option><option value="ST">Sao Tomé-et-Principe</option><option value="SN">Sénégal</option><option value="RS">Serbie</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapour</option><option value="SK">Slovaquie</option><option value="SI">Slovénie</option><option value="SO">Somalie</option><option value="SS">Soudan du sud</option><option value="SD">Soudan</option><option value="LK">Sri Lanka</option><option value="SE">Suède</option><option value="CH">Suisse</option><option value="SR">Suriname</option><option value="SJ">Svalbard et Jan Mayen</option><option value="SZ">Swaziland</option><option value="TJ">Tadjikistan</option><option value="TW">Taïwan</option><option value="TZ">Tanzanie</option><option value="TD">Tchad</option><option value="TF">Terres australes françaises</option><option value="IO">Territoire Britannique de l'Océan Indien</option><option value="TH">Thaïlande</option><option value="TL">Timor oriental</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinité-et-Tobago</option><option value="TN">Tunisie</option><option value="TM">Turkménistan</option><option value="TR">Turquie</option><option value="TV">Tuvalu</option><option value="UA">Ukraine</option><option value="UY">Uruguay</option><option value="VU">Vanuatu</option><option value="VE">Venezuela</option><option value="VN">Viêt Nam</option><option value="WF">Wallis et Futuna</option><option value="YE">Yémen</option><option value="ZM">Zambie</option><option value="ZW">Zimbabwe</option>

        </select>
        </div>
        <InputError message={errors.country} />
      </div>



      <div className="py-2">
        <InputLabel htmlFor="companyName" value="Company Name" />
        <TextInput
          id="companyName"
          name="companyName"
          type="text"
          value={companyName || ''}
          onChange={(e) => setData({ ...data, companyName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.companyName} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="companySize" value="Company Size" />
        <select
          id="companySize"
          name="companySize"
          value={companySize || ''}
          onChange={(e) => setData({ ...data, companySize: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        >
          <option value="">Select Company Size</option>
          <option value="1 - 99">&lt; 99</option>
          <option value="100 - 249">100 - 249 employees</option>
          <option value="250 - 499">250 - 499 employees</option>
          <option value="500 - 999">500 - 999 employees</option>
          <option value="1000 - 4999">1000 - 4999 employees</option>
          <option value="5000 - 9999">5000 - 9999 employees</option>
          <option value="10000+">10000+ employees</option>
        </select>
        <InputError message={errors.companySize} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="jobTitle" value="Job Title" />
        <select
          id="jobTitle"
          name="jobTitle"
          value={jobTitle || ''}
          onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        >
          <option value="">Intitulé de poste...</option>
          <option value="Recruiter">Recruteur</option>
          <option value="Manager">Responsable</option>
          <option value="Director">Directeur</option>
          <option value="Vice President">Vice-président</option>
          <option value="C Suite">Cadre dirigeant</option>
          <option value="NULL">Autre</option>
        </select>
        <InputError message={errors.jobTitle} />
      </div>

      <div className="py-2">
        <InputLabel htmlFor="desiredRecruitments" value="Desired Recruitments" />
        <TextInput
          id="desiredRecruitments"
          name="desiredRecruitments"
          type="number"
          value={desiredRecruitments || ''}
          onChange={(e) => setData({ ...data, desiredRecruitments: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          required
        />
        <InputError message={errors.desiredRecruitments} />
      </div>
    </>
  );
};

export default CompanyFields2;
