<template>
  <div>
    <header>
      <div class="ui stackable menu mymenu">
        <div  class="item">
          <img class="logo" src="../assets/V1.png"/>
        </div>
        <div class="right menu">
          <a class="item" href="/">Salir</a>
        </div>
      </div>
    </header>
  </div>
</template>

<style >
.mymenu{
  background: #2286C3 !important;
  
}
.item{
  color: white !important;
}
.logo{
  height: 100%;
}

.wrapper {
  margin-left: 1%;
  overflow: hidden; /* Eliminamos errores de float */
}
</style>