# # pull official base image
# FROM node:13.10.1-alpine

# # set working directory
# WORKDIR /usr/src/app

# COPY . /usr/src/app

# RUN npm install

# # start app
# CMD ["npm", "start"]


###########
# BUILDER #
###########

# base image
FROM node:13.10.1-alpine as builder

# set working directory
WORKDIR /usr/src/app


# create build
COPY . /usr/src/app
RUN npm run build


#########
# FINAL #
#########

# base image
FROM nginx:1.17.9-alpine

# update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# copy static files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]