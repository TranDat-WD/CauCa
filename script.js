const canvas = document.getElementById("sea");
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const ctx = canvas.getContext("2d");

canvas.width = screenWidth * 2;
canvas.height = screenHeight - 370;

class fish {
  constructor(x, y, size, speed, says) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = speed;
    this.say = says;
    // this.vy = Math.random() * (1 - 0.25) + 0.25;
    this.vy = 0;

    this.hinhAnh = new Image();
    this.hinhAnh.src = "src/img/Fish.png";
    this.hinhAnhDaLoad = false;

    this.hinhAnh1 = new Image();
    this.hinhAnh1.src = "src/img/Fish_fliped.png";

    this.hinhAnh.onload = () => {
      this.hinhAnhDaLoad = true;
    };
  }

  capNhatViTri() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Kiểm tra va chạm biên
    if (this.x < 0 || this.x + this.size > canvas.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y + this.size > canvas.height) {
      this.vy = -this.vy;
    }
  }

  veRoundRect() {
    ctx.strokeStyle = "rgb(16, 33, 53)";
    ctx.beginPath();
    ctx.roundRect(
      this.x + this.size + 10,
      this.y,
      this.size * 5.5,
      this.size,
      15,
    );
    ctx.stroke();
  }

  veBackground() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(80, 104, 133)";
    ctx.roundRect(
      this.x + this.size + 10,
      this.y,
      this.size * 5.5,
      this.size,
      15,
    );
    ctx.fill();
  }

  veText() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "20px serif";
    let line = 1;
    for (let i of this.say) {
      ctx.fillText(
        String(i),
        this.x + this.size + 20,
        this.y + 20 * line,
        this.size * 5,
      );
      line++;
    }
  }

  ve() {
    if (this.hinhAnhDaLoad) {
      if (this.vx > 0) {
        ctx.drawImage(this.hinhAnh1, this.x, this.y, this.size, this.size);
      } else {
        ctx.drawImage(this.hinhAnh, this.x, this.y, this.size, this.size);
      }
      this.veBackground();
      this.veRoundRect();
      this.veText();
    }
  }
}

// Tạo danh sách cá
const dapAn = [
  ["Tứ giác ABCD có các cạnh đối AB và DC,", "AD và BC song song với nhau"],
  ["Tứ giác ABCD có các cạnh đối AB và DC,", "AD và BC bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy A và B bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy C và D bằng nhau"],
  ["Tứ giác ABCD có một cặp cạnh đối", "AB và DC song song và bằng nhau"],
  ["Tứ giác ABCD có một cặp cạnh đối", "AD và BC song song và bằng nhau"],
  ["Tứ giác ABCD có các góc đối A và C,", "B và D bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy A và D bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy B và C bằng nhau"],
  ["Tứ giác ABCD có 2 cạnh kề", "AB và AD bằng nhau"],
  ["Tứ giác ABCD có 2 góc kề", "một cạnh bên B và C bằng nhau"],
  ["Tứ giác ABCD có 2 đường chéo", "AC và BD bằng nhau"],
];

const fishList = [];
for (let i = 0; i < 12; i++) {
  fishList.push(
    new fish(
      Math.random() * (canvas.width - 50),
      Math.random() * (canvas.height - 50),
      50,
      Math.random() * (1.5 - 0.5) + 0.5,
      dapAn[i],
    ),
  );
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fishList.length; i++) {
    fishList[i].capNhatViTri();
    fishList[i].ve(ctx);
  }

  requestAnimationFrame(animation);
}

animation();

for (let i of fishList) {
  i.ve();
}

window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas.width = screenWidth;
  canvas.height = screenHeight - 100;
});
