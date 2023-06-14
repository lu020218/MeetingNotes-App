using System;  
using System.Collections.Generic;  
using System.Drawing;  
using System.Linq;  
using System.Runtime.InteropServices;  
using System.Text;  
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MeetingNotesClassLib
{
    public struct RECT
    {
        public int Left; //最左坐标
        public int Top; //最上坐标
        public int Right; //最右坐标
        public int Bottom; //最下坐标
    }

    class ScreenCapture
    {
        #region 抓取屏幕  
        /// <summary>  
        /// 抓取屏幕(层叠的窗口)  
        /// </summary>  
        /// <param name="x">左上角的横坐标</param>  
        /// <param name="y">左上角的纵坐标</param>  
        /// <param name="width">抓取宽度</param>  
        /// <param name="height">抓取高度</param>  
        /// <returns></returns>  
        public static Bitmap CaptureScreen(int x, int y, int width, int height)
        {
            Bitmap bmp = new Bitmap(width, height);
            using (Graphics g = Graphics.FromImage(bmp))
            {
                g.CopyFromScreen(new Point(x, y), new Point(0, 0), bmp.Size);
                g.Dispose();
            }
            //bit.Save(@"capture2.png");  
            return bmp;
        }

        /// <summary>  
        ///  抓取整个屏幕  
        /// </summary>  
        /// <returns></returns>  
        public static Bitmap CaptureScreen(IntPtr intPtr)
        {
            Size screenSize = Screen.FromHandle(intPtr).WorkingArea.Size;
            int iX = Screen.FromHandle(intPtr).WorkingArea.X;
            int iY = Screen.FromHandle(intPtr).WorkingArea.Y;
            return CaptureScreen(iX, iY, screenSize.Width, screenSize.Height);
        }
        #endregion

        #region 使用BitBlt方法抓取控件，无论控件是否被遮挡  
        /// <summary>  
        /// 控件(窗口)的截图，控件被其他窗口(而非本窗口内控件)遮挡时也可以正确截图，使用BitBlt方法  
        /// </summary>  
        /// <param name="control">需要被截图的控件</param>  
        /// <returns>该控件的截图，控件被遮挡时也可以正确截图</returns>  
        public static Bitmap CaptureControl(IntPtr hWnd)
        {
            //调用API截屏
            RECT fx = new RECT();
            GetWindowRect(hWnd, ref fx);
            IntPtr hSrce = GetWindowDC(hWnd);
            IntPtr hDest = CreateCompatibleDC(hSrce);
            int width = fx.Right - fx.Left;
            int height = fx.Bottom - fx.Top;
            IntPtr hBmp = CreateCompatibleBitmap(hSrce, width, height);
            IntPtr hOldBmp = SelectObject(hDest, hBmp);
            if (BitBlt(hDest, 0, 0, width, height, hSrce, 0, 0, CopyPixelOperation.SourceCopy | CopyPixelOperation.CaptureBlt))
            {
                Bitmap bmp = Image.FromHbitmap(hBmp);
                SelectObject(hDest, hOldBmp);
                DeleteObject(hBmp);
                DeleteDC(hDest);
                ReleaseDC(hWnd, hSrce);
                // bmp.Save(@"a.png");
                // bmp.Dispose();
                return bmp;
            }
            return null;

        }
 
        #endregion


        #region 使用PrintWindow方法抓取窗口，无论控件是否被遮挡  
        /// <summary>  
        /// 窗口的截图，窗口被遮挡时也可以正确截图，使用PrintWindow方法  
        /// </summary>  
        /// <param name="control">需要被截图的窗口</param>  
        /// <returns>窗口的截图，控件被遮挡时也可以正确截图</returns>  
        public static Bitmap CaptureWindowUsingPrintWindow(Form form)
        {
            return GetWindow(form.Handle);
        }


        private static Bitmap GetWindow(IntPtr hWnd)
        {
            IntPtr hscrdc = GetWindowDC(hWnd);
            Control control = Control.FromHandle(hWnd);
            IntPtr hbitmap = CreateCompatibleBitmap(hscrdc, control.Width, control.Height);
            IntPtr hmemdc = CreateCompatibleDC(hscrdc);
            SelectObject(hmemdc, hbitmap);
            PrintWindow(hWnd, hmemdc, 0);
            Bitmap bmp = Bitmap.FromHbitmap(hbitmap);
            DeleteDC(hscrdc);//删除用过的对象  
            DeleteDC(hmemdc);//删除用过的对象  
            return bmp;
        }
        #endregion

        #region  DLL calls  
        [DllImport("gdi32.dll")]
        static extern bool BitBlt(IntPtr hdcDest, int xDest, int yDest, int
        wDest, int hDest, IntPtr hdcSource, int xSrc, int ySrc, CopyPixelOperation rop);
        [DllImport("gdi32.dll")]
        static extern IntPtr DeleteDC(IntPtr hDc);
        [DllImport("gdi32.dll")]
        static extern IntPtr DeleteObject(IntPtr hDc);
        [DllImport("gdi32.dll")]
        static extern IntPtr CreateCompatibleBitmap(IntPtr hdc, int nWidth, int nHeight);
        [DllImport("gdi32.dll")]
        static extern IntPtr CreateCompatibleDC(IntPtr hdc);
        [DllImport("gdi32.dll")]
        static extern IntPtr SelectObject(IntPtr hdc, IntPtr bmp);
        [DllImport("user32.dll")]
        public static extern IntPtr GetDesktopWindow();
        [DllImport("user32.dll")]
        public static extern IntPtr GetWindowDC(IntPtr ptr);
        [DllImport("user32.dll")]
        public static extern bool PrintWindow(IntPtr hwnd, IntPtr hdcBlt, UInt32 nFlags);
        [DllImport("user32.dll")]
        static extern bool ReleaseDC(IntPtr hWnd, IntPtr hDc);
        [DllImport("User32.dll", EntryPoint = "FindWindowEx")]
        public static extern IntPtr FindWindowEx(IntPtr hwndParent, IntPtr hwndChildAfter, string lpClassName, string lpWindowName);
        [DllImport("user32.dll")]
        public static extern bool GetWindowRect(IntPtr hWnd, ref RECT lpRect);
        #endregion
    }
}