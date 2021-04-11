<template>
  <div>
    <header>
      <div class="ui left fixed vertical menu mymenu">
        <div class="item">
          <img class="ui centered tiny image" src="../assets/V1.png" />
        </div>
        <div class="">
          <a class="item" href="/cajero"><i class="th icon"></i>MENU</a>
          <a class="item" href="/"
            ><i class="share square outline icon"></i>SALIR</a
          >
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