using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeetingNotesClassLib
{
    public class Startup
    {
        public static Startup Instace { get; set; }

        public Startup()
        {
            Instace = this;
        }

        private bool StartRecord()
        {
            return false;
        }

        private bool StopRecord()
        {
            return false;
        }

        private string Screenshot(string imgPath)
        {
            IntPtr intPtr = ScreenCapture.FindWindowEx(IntPtr.Zero, IntPtr.Zero, "Notepad++", null);
            Bitmap bitmap = ScreenCapture.CaptureScreen(intPtr);
            if (bitmap == null)
            {
                return null;
            }

            string fileName = "Screenshot_" + string.Format("{0:yyyyMMddHHmmss}", DateTime.Now) + ".png";
            imgPath = Path.Combine(imgPath, fileName);
            bitmap.Save(imgPath);
            return imgPath;
        }

        public async Task<object> GetInstance(dynamic input)
        {
            if (Instace == null)
            {
                Instace = new Startup();
            }

            return Instace;
        }

        public async Task<object> Start(dynamic input)
        {
            bool ret = Instace.StartRecord();

            if (!ret)
            {
                return "failed";
            }

            return "success";
        }

        public async Task<object> Stop(dynamic input)
        {
            bool ret = Instace.StopRecord();
            if (!ret)
            {
                return "failed";
            }

            return "success";
        }

        public async Task<object> ScreenCapturePng(dynamic input)
        {
            string imgPath = input.savePath;
            string ret = Instace.Screenshot(imgPath);
            if (ret == null)
            {
                return "failed";
            }

            return ret;
        }
    }
}
