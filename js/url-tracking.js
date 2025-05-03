const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("cstm_ppc_channel")) {
  const cstm_ppc_channel = urlParams.get("cstm_ppc_channel");
  Set_Cookie("cstm_ppc_channel", cstm_ppc_channel, 30); //the number 30 = 30 days
}
if (urlParams.has("cstm_ppc_campaign")) {
  const cstm_ppc_campaign = urlParams.get("cstm_ppc_campaign");
  Set_Cookie("cstm_ppc_campaign", cstm_ppc_campaign, 30);
}
if (urlParams.has("cstm_ppc_placement")) {
  const cstm_ppc_placement = urlParams.get("cstm_ppc_placement");
  Set_Cookie("cstm_ppc_placement", cstm_ppc_placement, 30);
}
if (urlParams.has("cstm_ppc_device")) {
  const cstm_ppc_device = urlParams.get("cstm_ppc_device");
  Set_Cookie("cstm_ppc_device", cstm_ppc_device, 30);
}
if (urlParams.has("cstm_ppc_keyword")) {
  const cstm_ppc_keyword = urlParams.get("cstm_ppc_keyword");
  Set_Cookie("cstm_ppc_keyword", cstm_ppc_keyword, 30);
}
if (urlParams.has("cstm_ppc_medium")) {
  const cstm_ppc_medium = urlParams.get("cstm_ppc_medium");
  Set_Cookie("cstm_ppc_medium", cstm_ppc_medium, 30);
}
if (urlParams.has("gclid")) {
  const gclid = urlParams.get("gclid");
  Set_Cookie("gclid", gclid, 30);
}
if (urlParams.has("camp_code")) {
  const camp_code = urlParams.get("camp_code");
  Set_Cookie("camp_code", camp_code, 30);
}

if (urlParams.has("UTM_Source")) {
  const UTM_Source = urlParams.get("UTM_Source");
  Set_Cookie("UTM_Source", UTM_Source, 30);
}
if (urlParams.has("UTM_Subsource")) {
  const UTM_Subsource = urlParams.get("UTM_Subsource");
  Set_Cookie("UTM_Subsource", UTM_Subsource, 30);
}
if (urlParams.has("UTM_Medium")) {
  const UTM_Medium = urlParams.get("UTM_Medium");
  Set_Cookie("UTM_Medium", UTM_Medium, 30);
}
if (urlParams.has("UTM_Campaign")) {
  const UTM_Campaign = urlParams.get("UTM_Campaign");
  Set_Cookie("UTM_Campaign", UTM_Campaign, 30);
}
if (urlParams.has("UTM_Term")) {
  const UTM_Term = urlParams.get("UTM_Term");
  Set_Cookie("UTM_Term", UTM_Term, 30);
}
if (urlParams.has("UTM_Ad_Group")) {
  const UTM_Ad_Group = urlParams.get("UTM_Ad_Group");
  Set_Cookie("UTM_Ad_Group", UTM_Ad_Group, 30);
}
if (urlParams.has("UTM_Placement")) {
  const UTM_Placement = urlParams.get("UTM_Placement");
  Set_Cookie("UTM_Placement", UTM_Placement, 30);
}
if (urlParams.has("UTM_Device")) {
  const UTM_Device = urlParams.get("UTM_Device");
  Set_Cookie("UTM_Device", UTM_Device, 30);
}
if (urlParams.has("UTM_GCLID")) {
  const UTM_GCLID = urlParams.get("UTM_GCLID");
  Set_Cookie("UTM_GCLID", UTM_GCLID, 30);
}
if (urlParams.has("UTM_Ad")) {
  const UTM_Ad = urlParams.get("UTM_Ad");
  Set_Cookie("UTM_Ad", UTM_Ad, 30);
}
if (urlParams.has("UTM_Location")) {
  const UTM_Location = urlParams.get("UTM_Location");
  Set_Cookie("UTM_Location", UTM_Location, 30);
}
if (urlParams.has("UTM_Channel")) {
  const UTM_Channel = urlParams.get("UTM_Channel");
  Set_Cookie("UTM_Channel", UTM_Channel, 30);
}
if (urlParams.has("UTM_Content")) {
  const UTM_Content = urlParams.get("UTM_Content");
  Set_Cookie("UTM_Content", UTM_Content, 30);
}
