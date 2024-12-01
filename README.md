#Unsplash image gallery - Vanilla JS + API consumption + OAuth + Docker

An interactive web application that allows users to view and search for
high-quality photos using the Unsplash public API. Users will be able to
authenticate via OAuth to access additional features, such as marking
photos as favorites.

##Current development state

So far the code is mostly proof-of-concepts and has value only from a
learning perspective. It is largely commented and the code was written
with legibility and explicity of the inner workings in mind. 

What's supported/done so far:
* A not so ugly responsive layout and style.
* Image searching through public Unsplash API resources.
* Cool but ugly tooltips when hovering over an image result, showing
image data: size and description.
* Every image result has its own (non-functional) favorite button (requires
yet unsupported user authentication).
* TODO image retrieval TODO.
* To some extent, a very modular and re-usable code (except the chaos of
the OAuth experiments).

What's NOT supported right now:
* The user authentication, though many of the required functions to deal
with the OAuth process are included and were tested. The decission to
make this process manually and step-by-step and sometimes weird, was made
to maximize the learning experience. 
* The correct separation in frontend and backend to isolate the exposure
of the credentials and to be able to finish the OAuth authentication process
which last step requires processing of post data.
* The implementation in docker.