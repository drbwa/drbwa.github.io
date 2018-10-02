# drbwa.github.io

I found it convenient to use Jekyll inside a Docker container.

You can use the `docker-compose.yml` in this repo, which is based on the official 
`jekyll/jekyll` Docker image. I have modified it to run a `/bin/bash` shell
instead of serving a site. 

You can start the Jekyll Docker container, by running this from the root directory of this repository:
```
docker-compose up
```

You can then log into the container as follows:
```
docker exec -ti jekyll /bin/bash
```

The current directory on the host is mounted into the container under the path
`/srv/jekyll`. Once logged into the container, you can use jekyll commands to
create and modify sites. 

You can start serving:
```
jekyll serve --watch --incremental --livereload
```
