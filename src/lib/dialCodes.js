// Country calling codes for the phone fields on the enrollment form. Each line
// is ISO country code | name | dial code. The visitor's own country is
// pre-selected (see PhoneField), and they can change it.
const RAW = `
PK|Pakistan|92
GB|United Kingdom|44
US|United States|1
CA|Canada|1
AU|Australia|61
NZ|New Zealand|64
IE|Ireland|353
SA|Saudi Arabia|966
AE|United Arab Emirates|971
QA|Qatar|974
KW|Kuwait|965
BH|Bahrain|973
OM|Oman|968
JO|Jordan|962
LB|Lebanon|961
IQ|Iraq|964
IR|Iran|98
TR|Turkey|90
EG|Egypt|20
MA|Morocco|212
DZ|Algeria|213
TN|Tunisia|216
LY|Libya|218
SD|Sudan|249
NG|Nigeria|234
GH|Ghana|233
KE|Kenya|254
TZ|Tanzania|255
UG|Uganda|256
ET|Ethiopia|251
ZA|South Africa|27
ZW|Zimbabwe|263
ZM|Zambia|260
SN|Senegal|221
IN|India|91
BD|Bangladesh|880
LK|Sri Lanka|94
NP|Nepal|977
AF|Afghanistan|93
MV|Maldives|960
MY|Malaysia|60
SG|Singapore|65
ID|Indonesia|62
TH|Thailand|66
PH|Philippines|63
VN|Vietnam|84
CN|China|86
HK|Hong Kong|852
JP|Japan|81
KR|South Korea|82
DE|Germany|49
FR|France|33
ES|Spain|34
PT|Portugal|351
IT|Italy|39
NL|Netherlands|31
BE|Belgium|32
CH|Switzerland|41
AT|Austria|43
SE|Sweden|46
NO|Norway|47
DK|Denmark|45
FI|Finland|358
PL|Poland|48
CZ|Czechia|420
GR|Greece|30
RO|Romania|40
BG|Bulgaria|359
HU|Hungary|36
RU|Russia|7
UA|Ukraine|380
KZ|Kazakhstan|7
UZ|Uzbekistan|998
AZ|Azerbaijan|994
BR|Brazil|55
AR|Argentina|54
CL|Chile|56
CO|Colombia|57
MX|Mexico|52
PE|Peru|51
TT|Trinidad and Tobago|1868
JM|Jamaica|1876
GY|Guyana|592
`;

export const DIAL_CODES = RAW.trim()
  .split("\n")
  .map((line) => {
    const [iso, name, dial] = line.split("|");
    return { iso, name, dial: `+${dial}` };
  });

export const DEFAULT_DIAL_ISO = "PK";
