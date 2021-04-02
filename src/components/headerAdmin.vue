<template>
  <div>
    <header>
      <div class="ui stackable menu mymenu">
        <div class="item">
          <img class="logo" src="../assets/V1.png" />
        </div>
        <div class="right menu">
          <a class="item" href="/admin/productos">Productos</a>
          <a class="item" href="/admin/inventario">Inventario</a>
          <a class="item" href="/admin/cajeros">Cajeros</a>
          <a class="item" href="/admin/marcas">Marcas</a>
          <a class="item" href="/admin/categorias">Categorías</a>
          <a class="item" href="/admin/ventas">Ventas</a>
          <a class="item" href="/admin/paquetes">Paquetes</a>
          <a class="item" href="/admin/descuentos">Descuentos</a>
          <a class="item" href="/">Salir</a>
        </div>
      </div>
    </header>
  </div>
</template>

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
  overflow: hidden; /* Eliminamos errores de float */
}

/* Menú de hamburguesa */
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

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onVisible() {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
  },
};
</script>
