import MRD1 from "../assets/images/mrd.jpg";
import MRD2 from "../assets/images/mrd1.png";
import MUD from "../assets/images/mud.png";
import MEN from "../assets/images/enm.jpg";
import MEN1 from "../assets/images/enm1.jpg";
import MWS from "../assets/images/mws.jpg";
import CWC from "../assets/images/cwc.jpg";
import CGWB from "../assets/images/cgwb.jpg";
import CPCB from "../assets/images/cpcb.png";
import NDMA from "../assets/images/ndma.png";
import MHA from "../assets/images/mha.png";
import NDRF from "../assets/images/ndr.jpg";

const Departments = [
  {
    name: "Ministry of Rural Development",
    url: MRD2,
    desc: "In order to ensure that the fruits of economic reform are shared by all sections of societies five elements of social and economic infrastructure, critical to the quality of life in rural areas, were identified. These are health, education, drinking water, housing and roads",
    name1: "Ministry of Urban Development",
    url1: MUD,
    desc1:
      "The Ministry of Urban Development is responsible for formulation of broad policies and programmes and assists State Governments/UTs in providing technical assistance in water supply and sanitation sector.",
  },
  {
    name: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    url: MEN1,
    desc: "The ministry is responsible for planning, promoting, coordinating, and overseeing the implementation of environmental and forestry programmes in the country.",
    name1: "Ministry of water supply",
    url1: MWS,
    desc1:
      "Ministry of water supply is responsible for rural water supply and sanitation. It also manages water scarcity problems in areas.",
  },
  {
    name: "Central water commission(CWC)",
    url: CWC,
    desc: "The CWC is charged with the general responsibility of initiating, coordinating and furthering in consultation with the State Governments concerned, schemes for the control, conservation and utilization of water resources in the respective state for the purpose of flood management, irrigation, drinking water supply and water power generation.",
    name1: "Central Ground Water Board (CGWB)",
    url1: CGWB,
    desc1:
      "Central Ground Water Board (CGWB), a subordinate office of the Ministry of Water Resources, Government of India, is the National Apex Agency entrusted with the responsibilities of providing scientific inputs for management, exploration, monitoring, assessment, augmentation and regulation of ground water resources of the country.",
  },
  {
    name: "Central Pollution Control Boards (CPCBs)",
    url: CPCB,
    desc: "Planning and organising training programs for people involved in activities for the prevention, improvement and control of Air and Water pollution. Collecting, compiling, and publishing statistical and technical reports related to Air & Water Pollution.",
    name1: "National Disaster Management Authority (NDMA)",
    url1: NDMA,
    desc1:
      "NDMA is mandated to lay down the policies, plans and guidelines for Disaster Management. India envisions the development of an ethos of Prevention, Mitigation, Preparedness and Response.",
  },
  {
    name: "Ministry of Home Affairs (MHA)",
    url: MHA,
    desc: "Apart from its major task of preserving the internal security of the country in its countless dimensions, the responsibilities of the Ministry of Home Affairs cover a wide arch of subjects such as Central Police Forces (CPFs), Centre-State relations, police modernization, border management, and disaster management.",
    name1: "National Disaster Response Force (NDRF)",
    url1: NDRF,
    desc1:
      "Performing rescue operations. Extending humanitarian aid in times of crisis. Working in collaboration with other institutions to provide relief and rehabilitation. Providing operational-level training to State Response Forces (Police, Civil Defense, and Home Guards).",
  },
];
const States = [
  { value: "1", name: "Andhra Pradesh" },
  { value: "2", name: "Arunachal Pradesh" },
  { value: "3", name: "Assam" },
  { value: "4", name: "Bihar" },
  { value: "5", name: "Chhattisgarh" },
  { value: "6", name: "Goa" },
  { value: "7", name: "Gujarat" },
  { value: "8", name: "Haryana" },
  { value: "9", name: "Himachal Pradesh" },
  { value: "10", name: "Jharkhand" },
  { value: "11", name: "Karnataka" },
  { value: "12", name: "Kerala" },
  { value: "13", name: "Madhya Pradesh" },
  { value: "14", name: "Maharashtra" },
  { value: "15", name: "Manipur" },
  { value: "16", name: "Meghalaya" },
  { value: "17", name: "Mizoram" },
  { value: "18", name: "Nagaland" },
  { value: "19", name: "Odisha" },
  { value: "20", name: "Punjab" },
  { value: "21", name: "Rajasthan" },
  { value: "22", name: "Sikkim" },
  { value: "23", name: "Tamil Nadu" },
  { value: "24", name: "Telangana" },
  { value: "25", name: "Tripura" },
  { value: "26", name: "Uttarakhand" },
  { value: "27", name: "Uttar Pradesh" },
  { value: "28", name: "West Bengal" },
];

const DeptList = [
  { value: "1", name: "Ward A", url: MRD2 },
  { value: "2", name: "Ward B", url: MUD },
  {
    value: "3",
    name: "Ward C",
    url: MEN1,
  },
  { value: "4", name: "Ward D", url: MWS },
  { value: "5", name: "Ward E", url: CWC },
  { value: "6", name: "Ward F north", url: CGWB },
  { value: "7", name: "Ward F south", url: CPCB },
  {
    value: "8",
    name: "Ward G north ",
    url: NDMA,
  },
  { value: "9", name: "Ward G south", url: MHA },
  { value: "10", name: "Ward H east", url: NDRF },
  { value: "11", name: "Ward H west", url: NDRF },
  { value: "12", name: "Ward K east", url: NDRF },
  { value: "13", name: "Ward K west", url: NDRF },
  { value: "14", name: "Ward M east", url: NDRF },
  { value: "15", name: "Ward M west ", url: NDRF },
  { value: "16", name: "Ward L", url: NDRF },
  { value: "17", name: "Ward T", url: NDRF },
  { value: "18", name: "Ward N", url: NDRF },
];

export { Departments, States, DeptList };
