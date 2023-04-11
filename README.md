<br />
<br />
<div align="center">
    <img src="https://user-images.githubusercontent.com/79212283/231085956-a6c873d1-55f9-4ef4-8940-2a669571f86e.gif" alt="Logo" width="full">
</div>

<div align="center">

<h1 align="center" style="margin: 0;">packetify</h1>
<p>📦 📦 📦 📦</p>
<p align="center" style="margin-top: 0; font-size: 1.2rem;">
    packet based asynchronous rest library for backend applications.
    <br />
    <p>(read -> handle -> write)</p>
    <br />
    <a href="https://github.com/fitchle/packetify/wiki">📖 Documents 📖</a>
    ·
    <a href="https://github.com/fitchle/packetify/issues">🕷️ Report Bug 🕷️</a>
    ·
    <a href="https://github.com/fitchle/packetify/issues">💎 Request Feature 💎</a>
  </p>
</div>
<div align="center">
    <a href="https://github.com/orgs/fitchle/people">
        <img src="https://img.shields.io/github/contributors/fitchle/packetify?style=for-the-badge"></img>
    </a>
    <a href="https://github.com/fitchle/packetify/network/members">
        <img src="https://img.shields.io/github/forks/fitchle/packetify?style=for-the-badge"></img>
    </a>
    <a href="https://github.com/fitchle/packetify/stargazers">
        <img src="https://img.shields.io/github/stars/fitchle/packetify?style=for-the-badge"></img>
    </a>
    <a href="https://github.com/fitchle/packetify/issues">
        <img src="https://img.shields.io/github/issues/fitchle/packetify?style=for-the-badge"></img>
    </a>
    <a href="https://github.com/fitchle/packetify/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/fitchle/packetify?style=for-the-badge"></img>
    </a>

</div>
<br/>
<br/>
<details>
  <summary style="font-size: 15px;">Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>
<br/>
<br/>

<h2 style="margin: 0;">📗 About The Project</h2>
<p style="margin: 0;">
Packetify is an understandable asynchronous library made to make your backend works easier (RESTAPI, jwt-token based authentication etc.)
</p>

Here's why:
* It is an **easy to use** library, no need to waste time anymore!
* It is an **understandable** library.
* It is an **asynchronous** library.

### Built With
<p style="margin: 0; line-height: 20px;">In this project, `fastify` was used as server base, `zod` was used as validation, `@fastify/jwt` was used as authentication token library.</p>

* [Fastify](https://www.fastify.io/)
* [zod](https://zod.dev/)
* [@fastify/jwt](https://www.npmjs.com/package/@fastify/jwt)

## 🌙 Getting Started

### ✨ Installation

1. Install with `npm` or `yarn`
```sh
   npm install packetify
```
with `yarn`
```sh
   yarn add packetify
```
2. Read the documents
3. wake(), eat(), code(), sleep(), repeat() !

## ⚡ Usage
<h4 style="margin-top: 30px;">Creating Packetify Server</h4>

```ts
const packetify: Packetify = new Packetify()

// registering packets etc. 

packetify.listen(PORT) // Default Port: 45317
```

<br>
<h4 style="margin-top: 10px;">Creating Packets 📦</h4>

```ts
import { Packet } from 'packetify'

@PacketifyPacket("/my/path/:id",
 PacketMethod.GET, // PacketMethod.GET or PacketMethod.POST (under construction)
 z.object({ // Query Schema (zod)
    username: z.string().min(5).max(16),
    password: z.string()
}))
class MyPacket extends Packet {
    /**
     * 
     * READING QUERY & PARAMS DATA
     * 
    */
    read(data: any): void {
        this.data = data;
    }


    /**
     * 
     * HANDLING SOMETHINGS
     * 
     */
    handle(): void {
        console.log(this.data.query)
    }


    /**
     * 
     * RESPONSE (SUCCESSFUL)
     * 
     */
    write() {
        return {"asdasdasd": "asdasd"};
    }


    /**
     * 
     * ERROR HANDLING (zod query errors etc.)
     * 
     */
    onError(error: FastifyError, request: FastifyRequest): void {
        console.log(error)
        reply.send("ERROR!")
    }

    
}
```

For more examples, please refer to the [Documentation](https://fitchle.com/packetify#docs)

## 🔐 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact
<a href="http://discordapp.com/users/858377828872486922"><img src="https://img.shields.io/badge/-Discord-black.svg?style=for-the-badge&logo=discord&logoColor=white&colorB=6366F1"></img></a>

## 🧑🏻‍💻 Contributors
<img src="https://i.ibb.co/cvBQ2Qj/Gimble-Logo-Design.png" width="100" style="border-radius: 15px"></img>
<img src="https://i.ibb.co/rHZn9SJ/pp-00000.png" width="100" style="border-radius: 15px"></img>
