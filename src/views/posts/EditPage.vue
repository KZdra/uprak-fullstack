<template>
    <div class="container mt-custom">
        <!-- Tampilan form edit post -->
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT POST</h4>
                        <hr>
                        <div v-if="validation.errors" class="mt-2 alert alert-danger">
                            <ul class="mt-0 mb-0">
                                <li v-for="(error, index) in validation.errors" :key="index">{{ `${error.param} : ${error.msg}` }}</li>
                            </ul>
                        </div>
                        <form @submit.prevent="update">
                            <!-- Input untuk NIS -->
                            <div class="form-group">
                                <label for="nis" class="font-weight-bold mb-2">NIS</label>
                                <input type="text" class="form-control" v-model="post.nis" placeholder="Masukkan NIS" />
                            </div>
                            <!-- Input untuk Nama -->
                            <div class="form-group mt-3">
                                <label for="nama" class="font-weight-bold mb-2">Nama</label>
                                <input type="text" class="form-control" v-model="post.nama" placeholder="Masukkan Nama" />
                            </div>
                            <!-- Input untuk Jenis Kelamin -->
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
                            <!-- Input untuk Tempat Lahir -->
                            <div class="form-group mt-3">
                                <label for="tempat_lahir" class="font-weight-bold mb-2">Tempat Lahir</label>
                                <input type="text" class="form-control" v-model="post.tempat_lahir" placeholder="Masukkan Tempat Lahir" />
                            </div>
                            <!-- Input untuk Tanggal Lahir -->
                            <div class="form-group mt-3">
                                <label for="tanggal_lahir" class="font-weight-bold mb-2">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="post.tanggal_lahir" placeholder="Masukkan Tanggal Lahir" />
                            </div>
                            <!-- Input untuk No. HP -->
                            <div class="form-group mt-3">
                                <label for="no_hp" class="font-weight-bold mb-2">No. HP</label>
                                <input type="text" class="form-control" v-model="post.no_hp" placeholder="Masukkan No. HP" />
                            </div>
                            <!-- Input untuk Alamat -->
                            <div class="form-group mt-3">
                                <label for="alamat" class="font-weight-bold mb-2">Alamat</label>
                                <input type="text" class="form-control" v-model="post.alamat" placeholder="Masukkan Alamat" />
                            </div>
                            <!-- Input untuk Nama Orang Tua -->
                            <div class="form-group mt-3">
                                <label for="nama_ortu" class="font-weight-bold mb-2">Nama Orang Tua</label>
                                <input type="text" class="form-control" v-model="post.nama_ortu" placeholder="Masukkan Nama Orang Tua" />
                            </div>

                            <!-- Input untuk Unggah Gambar -->
                            <div class="form-group mt-3">
                                <label for="gambar" class="font-weight-bold mb-2">Ganti Gambar (Biarkan kosong untuk tetap menggunakan gambar yang ada)</label>
                                <input type="file" @change="onFileChange" class="form-control" accept="image/*" />
                            </div>
                            <!-- Tombol Update -->
                            <button type="submit" class="btn btn-primary mt-3">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: "EditPage",
  setup() {
    // State posts
    const post = reactive({
      nis: "",
      nama: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      no_hp: "",
      alamat: "",
      nama_ortu: "",
      gambar: null // Menambahkan state untuk menyimpan file gambar
    })

    // State validation
    const validation = ref([])

    // Vue router
    const router = useRouter()

    // Vue route
    const route = useRoute()

    // State untuk menyimpan informasi gambar yang akan diunggah
    const uploadedImage = ref(null);

    // Mounted
    onMounted(() => {
      // Get API from Backend
      axios.get(`http://127.0.0.1:3000/tampil/${route.params.id}`)
        .then(response => {
          // Assign state posts with response data
          const postData = response.data.data[0];
          post.nis = postData.nis;
          post.nama = postData.nama;
          post.jenis_kelamin = postData.jenis_kelamin;
          post.tempat_lahir = postData.tempat_lahir;
          post.tanggal_lahir = postData.tanggal_lahir;
          post.no_hp = postData.no_hp;
          post.alamat = postData.alamat;
          post.nama_ortu = postData.nama_ortu;
          post.gambar = postData.gambar; // Set gambar
        })
        .catch(error => {
          console.log(error.response.data)
        })
    })

    // Method untuk menangani perubahan file gambar
    function onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        uploadedImage.value = file;
      }
    }

    // Method update
    function update() {
      let formData = new FormData();
      formData.append('nis', post.nis);
      formData.append('nama', post.nama);
      formData.append('jenis_kelamin', post.jenis_kelamin);
      formData.append('tempat_lahir', post.tempat_lahir);
      formData.append('tanggal_lahir', post.tanggal_lahir);
      formData.append('no_hp', post.no_hp);
      formData.append('alamat', post.alamat);
      formData.append('nama_ortu', post.nama_ortu);

      // Periksa apakah ada file gambar yang diunggah atau tidak
      if (uploadedImage.value !== null) {
        formData.append('gambar', uploadedImage.value);
      } else {
        // Jika tidak ada gambar yang diunggah, kirim null untuk menyatakan gambar tidak diubah
        formData.append('gambar', null);
      }

      axios.patch(`http://127.0.0.1:3000/patch/${route.params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        router.push({ name: 'posts.index' });
      }).catch(error => {
        validation.value = error.response.data;
      });
    }

    // Return
    return {
      post,
      validation,
      router,
      update,
      onFileChange
    }
  }
}
</script>