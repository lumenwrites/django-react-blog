const webpack = require('webpack'); 

function getPlugins() {
    const plugins = [];

    plugins.push(new webpack.DefinePlugin({
	'process.env':{
	    'NODE_ENV': JSON.stringify('production'),
	}
    }));

    if (process.env.NODE_ENV === "production") {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
              }
        })); 
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
}



module.exports = {
    entry: [
	'./src/index.js'
    ],
    output: {
	path: __dirname,
	publicPath: '/',
	filename: 'bundle.js'
    },
    module: {
	loaders: [
	    {
		exclude: /node_modules/,
		loader: 'babel',
		query: {
		    presets: ['react', 'es2015', 'stage-1']
		}
	    },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
	    {
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	    },
	    {
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		loader: 'url-loader?limit=100000'
	    },
	    {
		test: /\.json$/,
		loader: 'json-loader'
	    }	    
	]
    },
    plugins: getPlugins(),
    resolve: {
	extensions: ['', '.js', '.jsx']
    },
    devServer: {
	historyApiFallback: true,
	contentBase: './'
    }
    
};
