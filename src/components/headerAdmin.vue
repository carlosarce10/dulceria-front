<template>
  <div>
    <header>
      <div class="ui left fixed vertical menu mymenu">
        <div class="item">
          <img class="ui centered tiny image" src="../assets/V1.png" />
        </div>
        <div class="">
          <a class="item" href="/admin/ventas"
            ><i class="money bill alternate outline icon"></i>Ventas</a
          >
          <a class="item" href="/admin/inventario"
            ><i class="clipboard list icon"></i>Inventario</a
          >
          <a class="item" href="/admin/paquetes"
            ><i class="boxes icon"></i>Paquetes</a
          >
          <a class="item" href="/admin/productos"
            ><i class="shopping basket icon"></i>Productos</a
          >
          <a class="item" href="/admin/marcas"
            ><i class="tags icon"></i>Marcas</a
          >
          <a class="item" href="/admin/categorias">
            <i class="table icon"></i>Categorías</a
          >
          <a class="item" href="/admin/descuentos"
            ><i class="percent icon"></i>Descuentos</a
          >
          <a class="item" href="/admin/cajeros"
            ><i class="user circle outline icon"></i> Cajeros</a
          >
          <a class="item" href="/admin/bitacora"
            ><i class="clipboard list icon"></i>Bitácora</a
          >
          <a class="item" href="#" @click="logout()"
            ><i class="share square outline icon"></i>Salir</a
          >
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      visible: false,
    };
  },
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token === null) {
      localStorage.clear();
      this.$router.push("/");
    }
    let auth = localStorage.getItem("authority");
    if (auth === null || auth !== "ROLE_ADMIN") {
      this.$router.push("/");
    }
  },
  methods: {
    onVisible() {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.mymenu {
  background: #2286c3 !important;
  border-radius: 0 !important;
}
.item {
  color: white !important;
}
.logo {
  height: 100%;
}

.wrapper {
  margin-left: 1%;
  overflow: hidden; 
}

#content {
  min-height: 100px;
}
.ui.grid {
  padding: 0 !important;
}
.pushable.segment {
  margin: 0 !important;
}
</style>


