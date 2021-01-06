# apicce
Server value:
apimanager.us-south.apiconnect.cloud.ibm.com
apimanager.us-east.apiconnect.cloud.ibm.com
apimanager.au-syd.apiconnect.cloud.ibm.com
apimanager.eu-gb.apiconnect.cloud.ibm.com
apimanager.eu-de.apiconnect.cloud.ibm.com

1. GET ORGANIZATION LIST
curl --url "XXX/get/orgs" \
--header 'server: REPLACE' \
--header 'apik: REPLACE'

2. GET CATALOG LIST
curl --url "XXX/get/catalogs" \
--header 'server: REPLACE' \
--header 'apik: REPLACE' \
--header 'org: REPLACE_WITH_ORG'

3. GET MEMBER LIST
curl --url "XXX/get/members" \
--header 'server: REPLACE' \
--header 'apik: REPLACE' \
--header 'org: REPLACE_WITH_ORG'

4. CHANGE CATALOG OWNER
curl --url "XXX/get/change" \
--header 'server: REPLACE' \
--header 'apik: REPLACE' \
--header 'org: REPLACE_WITH_ORG' \
--header 'catalog: REPLACE_WITH_CATALOG_ID' \
--header 'user: REPLACE_WITH_MEMBER_ID'
