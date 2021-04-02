<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
.modal-small > div {
  width: 30% !important;
}

.panel {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

.panel-small {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Validaciones */
.dirty {
  border-color: #8e8 !important;
}

.dirty:focus {
  outline-color: #8e8 !important;
}

.error {
  border-color: #f99 !important;
}

.error:focus {
  outline-color: #f99 !important;
}

.errorMsg {
  color: #f99;
  margin-top: 2%;
  font-size: small;
}
</style>
