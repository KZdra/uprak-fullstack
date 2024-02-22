<template>
  <div class="container mt-custom">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH POST</h4>
            <hr />
            <div v-if="validation.errors" class="mt-2 alert alert-danger">
              <ul class="mt-0 mb-0">
                <li v-for="(error, index) in validation.errors" :key="index">
                  {{ `${error.param} : ${error.msg}` }}
                </li>
              </ul>
            </div>
            <form @submit.prevent="store">
              <div class="form-group">
                <label for="nis" class="font-weight-bold mb-2">NIS</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.nis"
                  placeholder="Masukkan NIS"
                />
              </div>
              <div class="form-group mt-3">
                <label for="nama" class="font-weight-bold mb-2">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.nama"
                  placeholder="Masukkan Nama"
                />
              </div>
              <div class="form-group mt-3">
                <label class="font-weight-bold mb-2">Jenis Kelamin</label><br>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="laki-laki" value="Laki-Laki" v-model="post.jenis_kelamin">
                  <label class="form-check-label" for="laki-laki">Laki-Laki</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="perempuan" value="Perempuan" v-model="post.jenis_kelamin">
                  <label class="form-check-label" for="perempuan">Perempuan</label>
                </div>
              </div>
              <div class="form-group mt-3">
                <label for="tempat_lahir" class="font-weight-bold mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.tempat_lahir"
                  placeholder="Masukkan Tempat Lahir"
                />
              </div>
              <div class="form-group mt-3">
                <label for="tanggal_lahir" class="font-weight-bold mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="post.tanggal_lahir"
                  placeholder="Masukkan Tanggal Lahir"
                />
              </div>
              <div class="form-group mt-3">
                <label for="no_hp" class="font-weight-bold mb-2">No. HP</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.no_hp"
                  placeholder="Masukkan No. HP"
                />
              </div>
              <div class="form-group mt-3">
                <label for="alamat" class="font-weight-bold mb-2">Alamat</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.alamat"
                  placeholder="Masukkan Alamat"
                />
              </div>
              <div class="form-group mt-3">
                <label for="nama_ortu" class="font-weight-bold mb-2">Nama Orang Tua</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="post.nama_ortu"
                  placeholder="Masukkan Nama Orang Tua"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "CreatePage",
  setup() {
    //state posts
    const post = reactive({
      nis: "",
      nama: "",
      jenis_kelamin: "", // modified field
      tempat_lahir: "",
      tanggal_lahir: "",
      no_hp: "",
      alamat: "",
      nama_ortu: ""
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let nis = post.nis;
      let nama = post.nama;
      let jenis_kelamin = post.jenis_kelamin;
      let tempat_lahir = post.tempat_lahir;
      let tanggal_lahir = post.tanggal_lahir;
      let no_hp = post.no_hp;
      let alamat = post.alamat;
      let nama_ortu = post.nama_ortu;

      axios
        .post("http://127.0.0.1:3000/tambah", {
          nis: nis,
          nama: nama,
          jenis_kelamin: jenis_kelamin,
          tempat_lahir: tempat_lahir,
          tanggal_lahir: tanggal_lahir,
          no_hp: no_hp,
          alamat: alamat,
          nama_ortu: nama_ortu
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "posts.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      post,
      validation,
      router,
      store,
    };
  },
};
</script>
