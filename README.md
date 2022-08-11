[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c06e3d85f828471697516ab6d658c21d)](https://www.codacy.com/gh/hayatu89/simple-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hayatu89/simple-api&amp;utm_campaign=Badge_Grade)


# Backend Assessment

Build and deploy a very simple API that does the following

1.  Calculate and return the age of a person, given their date of birth (dob) as query parameters to `GET /howold`
2.  Limit calls to `GET /howold` and prevent excessive usage from potentially ill-configured or malicious integrators. Only allow a maximum of 3 calls per second for each API client/caller
See full details and instructions in this [Google Doc](https://docs.google.com/document/d/1ma5vKz0j34gwI9WYrZddMM1ENlQddGOVFJ5qdSq2QlQ)